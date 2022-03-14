import { useMutation, useQuery, useQueryClient } from 'react-query';
import { atom } from 'jotai';

const supplierAtom = atom(null);

const useSuppliers = () => {
    const bookshelf = window.bookshelf;
    return useQuery(
        "suppliers",
        () => bookshelf.suppliers.findMany(),
        { initialData: [] }
    );
};

const useMutateSupplier = () => {
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    return useMutation(
        async (form) => {
            //eslint-disable-next-line
            const {id} = form; 
            const clientQuery = {
                ...( id ? {
                    where: {
                        id
                    }
                } : {} ),
                data: {
                    ...form
                }
            };
            const method = id ? "update" : "create";
            const result = await bookshelf.suppliers[method](clientQuery);
            return result;
        }, {
            onSuccess: (data,variables) => {
                if( !Array.isArray( data ) ){
                    queryClient.setQueryData(
                        "suppliers",
                        old => {
                            console.log({ old });
                            let oldData = Array.isArray(old) ? old : []
                            return variables.id 
                                ? oldData.map( supplier => {
                                    if(supplier.id === variables.id){
                                        return data;
                                    }
                                    return supplier;
                                }) : ([...oldData,data])
                        }
                    );
                }
            }
        }
    );
};

const useDeleteSuppliers = () => {
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    const modelKey = "suppliers";
    return useMutation(
        async ({ supplierId }) => {
            await bookshelf.suplliers.delete({
                where: {
                    id: supplierId
                }
            });
        }, {
            onMutate: async ({ supplierId }) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(modelKey);
            
                // Snapshot the previous value
                const previous = queryClient.getQueryData(modelKey);
            
                // Optimistically update to the new value
                queryClient.setQueryData(
                    modelKey, 
                    old => old.filter( supplier => supplier.id !== supplierId )
                );
            
                // Return a context object with the snapshotted value
                return { previous };
            },
              // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err, newTodo, context) => {
                queryClient.setQueryData(modelKey, context.previous );
            },
              // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(modelKey);
            }
        }
    );
};

export { useSuppliers, useMutateSupplier, useDeleteSuppliers, supplierAtom };