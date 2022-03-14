import { useMutation, useQuery, useQueryClient } from 'react-query';
import { atom } from 'jotai';


const transportAtom = atom(null);

const useTransports= () =>{
    const bookshelf = window.bookshelf;
    return useQuery(
        "transports",
        () => bookshelf.transports.findMany(),
        { initialData: [] }
    );
};

const useMutateTransport = () => {
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
            const result = await bookshelf.transports[method](clientQuery);
            return result;
        }, {
            onSuccess: (data,variables) => {
                if( !Array.isArray( data ) ){
                    queryClient.setQueryData(
                        "transports",
                        old => variables.id 
                            ? old.map( transport => {
                                if(transport.id === variables.id){
                                    return data;
                                }
                                return transport;
                            }) : ([...old,data])
                    );
                }
            }
        }
    );
};


const useDeleteTransports = () => {
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    const modelKey = "transports";
    return useMutation(
        async ({ transportId }) => {
            await bookshelf.transports.delete({
                where: {
                    id: transportId
                }
            });
        }, {
            onMutate: async ({ transportId }) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(modelKey);
            
                // Snapshot the previous value
                const previous = queryClient.getQueryData(modelKey);
            
                // Optimistically update to the new value
                queryClient.setQueryData(
                    modelKey, 
                    old => old.filter( transport => transport.id !== transportId )
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



export { useTransports, useMutateTransport, useDeleteTransports, transportAtom };