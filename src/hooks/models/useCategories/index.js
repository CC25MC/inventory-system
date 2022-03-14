import { useMutation, useQuery, useQueryClient } from "react-query";

const useCategories = () => {
    const bookshelf = window.bookshelf;
    return useQuery(
        "categories",
        async () => {
            const result = await bookshelf.categories.findMany();
            return result;
        },
        {
            initialData: []
        }
    );
};

const useMutateCategories = () => {
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    return useMutation(
        (values) => bookshelf.categories.create({
            data: {
                ...values
            }
        }),
        {
            onSuccess: (data,variables) => {
                if( !Array.isArray( data ) ){
                    queryClient.setQueryData(
                        "categories",
                        old => variables.id 
                            ? old.map( client => {
                                if(client.id === variables.id){
                                    return data;
                                }
                                return client;
                            }) : ([...old,data])
                    );
                }
            }
        }
    );
};

const useDeleteCategories = () => {
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    const modelKey = "categories";
    return useMutation(
        async ({ categoriesId }) => {
            console.log(categoriesId);
            await bookshelf.categories.delete({
                where: {
                    id: categoriesId
                }
            });
        }, {
            onMutate: async ({ categoriesId }) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(modelKey);
            
                // Snapshot the previous value
                const previous = queryClient.getQueryData(modelKey);
            
                // Optimistically update to the new value
                queryClient.setQueryData(
                    modelKey, 
                    old => old.filter( categories => categories.id !== categoriesId )
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

export { useCategories, useMutateCategories, useDeleteCategories };