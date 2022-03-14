//import { useDB } from 'hooks/useDB';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { atom } from 'jotai';
import { mergeArrayObjects, parseExcelData } from 'utils';

//import { storeProduct } from 'utils/message-control/models';

const productAtom = atom(null);
const returnBestSellersProducts = 
    `SELECT products.id as product_id, products.name, products.price, products.cost, products.quantity, products.code, stock_movements.id stock_movements_id, SUM(stock_movements.quantity) as total
    FROM products
    lEFT JOIN stock_movements ON products.id = stock_movements.product_id
    WHERE stock_movements.type = 'SALIDA'
    GROUP by product_id 
    ORDER by stock_movements.quantity asc
    `
const returnOrderByQuantity =
    `SELECT *
    FROM products
    ORDER by products.quantity asc
    `


const useProducts = () => {
    const bookshelf = window.bookshelf;
    return useQuery(
        "products",
        async () => {
            const result = await bookshelf.products.findMany({
                withRelated: ['images','category',"supplier", "ingredients"]
            })
            return result;
        },
        { initialData: [] }
    );
};

const useMutateProducts = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (form) => {
            const bookshelf = window.bookshelf;
            //eslint-disable-next-line
            const {hasImages,images,category,supplier, id, ingredients, ...product} = form; 
            let productImages = [];
            const imagesToStore = images?.filter( i => !i.id );
            if(imagesToStore.length) {
                const files = await window.storeFiles(imagesToStore.map(
                    i => ({ name: i.name, path: i.path })
                ));
                productImages = files.map( file => ({ name: file.filename, path: file.path }) );
            }   
            const cost     = isNaN ( parseFloat(product.cost) ) ? null : parseFloat( product.cost );
            const quantity = isNaN ( parseFloat(product.quantity) ) ? null : parseFloat( product.quantity );
            const productQuery = {
                ...( id ? {
                    where: {
                        id
                    }
                } : {} ),
                data: {
                    ...product,
                    ...( category ? { category_id: category.id } : {} ),
                    ...( supplier ? { supplier_id: supplier.id } : {} ),
                    cost,
                    quantity,
                    color: product.color ?? null
                },
                relations: {
                    images: productImages, 
                    ingredients: ingredients
                },
                include: {
                    images: true,
                    category: true,
                    ingredients: true
                }
            };
            const method = id ? "update" : "create";
            const result = await bookshelf.products[method](productQuery);
            return result;
        }, {
            onSuccess: (data,variables) => {
                if( !Array.isArray( data ) ){
                    queryClient.setQueryData(
                        "products",
                        old => variables.id 
                            ? old.map( product => {
                                if(product.id === variables.id){
                                    return data;
                                }
                                return product;
                            }) : [...old,data]
                    );
                }
            }
        }
    );
};


const useImportProductsMutation = () => {
    const productKeyMap = {
        nombre: 'name',
        precio: 'price'
    }
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    return useMutation( async ({ products }) => {
        const parsedProducts = parseExcelData(products,productKeyMap);
        const newProducts = await bookshelf.products.upsertMany({
            data: parsedProducts
        });
        return newProducts;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData(
                "products",
                old => {
                    return mergeArrayObjects(old,data);
                }
            );
        }
    });
}

const useCreateMultipleProductsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ products }) => {
            const newProducts = await bookshelf.products.createMany({
                data: products
            });
            return newProducts;
        }, {
            onSuccess: (data) => {
                queryClient.setQueryData(
                    "products",
                    old => {
                        return [...old,...data]
                    }
                );
            }
        }
    )
}

const useDeleteProducts = () => {
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    return useMutation(
        async ({ productId }) => {
            /*await bookshelf.imageProducts.deleteMany({
                where: {
                    product_id: productId
                }
                });*/
            await bookshelf.products.delete({
                where: {
                    id: productId
                }
            });
        }, {
            onMutate: async ({ productId }) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries('products');
            
                // Snapshot the previous value
                const previous = queryClient.getQueryData('products');
            
                // Optimistically update to the new value
                queryClient.setQueryData(
                    'products', 
                    old => old.filter( product => product.id !== productId )
                );
            
                // Return a context object with the snapshotted value
                return { previous };
            },
              // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err, newTodo, context) => {
                queryClient.setQueryData('products', context.previous );
            },
              // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries('products');
            }
        }
    );
};

const useBestSellerProducts = () =>{
    
    return useQuery(
        "bestsellerproducts", 
        async() =>{
            const result = await  window.bookshelf.runRawSQL(returnBestSellersProducts)
            return result


        }
        )

    
}

const useQuantityProducts = () => {
    return useQuery(
        "orderbyquantityproducts",
        async()=>{
            const result = await window.bookshelf.runRawSQL(returnOrderByQuantity)
            return result
        }
    )
}
export { 
    useProducts, 
    useMutateProducts, 
    useDeleteProducts, 
    productAtom, 
    useImportProductsMutation,
    useCreateMultipleProductsMutation,
    useBestSellerProducts,
    useQuantityProducts
};