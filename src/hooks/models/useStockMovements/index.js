import { useMutation, useQuery, useQueryClient } from 'react-query';

const useMutateStockMovement = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async ({ quantity, type = 'ENTRADA', product, date }) => { 
            const bookshelf = window.bookshelf;
            let newProductQuantity = parseInt( product.quantity ?? 0 ) + parseInt( quantity );
            const movement = await bookshelf.stockMovements.create({
                data: {
                    product_name: product.name,
                    quantity,
                    date,
                    type,
                    price: 0,
                    balance: newProductQuantity
                }
            });
            if( type === 'ENTRADA' ){
                await bookshelf.products.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        quantity: newProductQuantity
                    }
                });
                product.quantity = newProductQuantity;
            }
            return {...movement, product };
        }, 
        {
            // When mutate is called:
            onMutate: async ({ product : updatedProduct, ...rest }) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries('products')

                // Snapshot the previous value
                const previousProducts = queryClient.getQueryData('products')

                // Optimistically update to the new value
                queryClient.setQueryData('products', old => old.map( product => {
                    if( product.id === updatedProduct.id ){
                        return updatedProduct
                    }
                    return product;
                }))

                // Return a context object with the snapshotted value
                return { previousProducts }
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err, newTodo, context) => {
                queryClient.setQueryData('products', context.previousProducts)
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries('products')
            },
        }
    );
}

const useStockMovements = () => {
    return useQuery(
        "stock-movements",
        async () => {
            const movements = await window.bookshelf.stockMovements.findMany();
            console.log({ movements });
            return movements;
        }, {
            initialData: [],
            select: history => history.filter( movement => !movement.fast_sell ).reverse()
        }
    )
}

export { useMutateStockMovement, useStockMovements };