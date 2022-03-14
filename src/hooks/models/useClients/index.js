import { useMutation, useQuery, useQueryClient } from 'react-query';
import { atom } from 'jotai';

const clientAtom = atom(null);
const clientsBySellings=
    `SELECT clients.id as client_id, bills.id as bill_id, clients.name, clients.lastname, clients.phone, clients.rut, clients.whatsapp, clients.address, sum(stock_movements.quantity) as sales
    FROM clients
    LEFT JOIN bills on clients.id = bills.client_id
    LEFT JOIN stock_movements on bills.id = stock_movements.bill_id
    GROUP by client_id
    ORDER by sales  ASC`

const useClients= () => {
    const bookshelf = window.bookshelf;
    return useQuery(
        "clients",
        () => bookshelf.clients.findMany(),
        { initialData: [] }
    );
};

const useMutateClient = () => {
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
            const result = await bookshelf.clients[method](clientQuery);
            return result;
        }, {
            onSuccess: (data,variables) => {
                if( !Array.isArray( data ) ){
                    queryClient.setQueryData(
                        "clients",
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

const useDeleteClients = () => {
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    const modelKey = "clients";
    return useMutation(
        async ({ clientId }) => {
            await bookshelf.clients.delete({
                where: {
                    id: clientId
                }
            });
        }, {
            onMutate: async ({ clientId }) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(modelKey);
            
                // Snapshot the previous value
                const previous = queryClient.getQueryData(modelKey);
            
                // Optimistically update to the new value
                queryClient.setQueryData(
                    modelKey, 
                    old => old.filter( client => client.id !== clientId )
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

const useClientsBySellings = () => {
    return useQuery(
        "clientsorderbysellings",
        async()=>{
            const result = await window.bookshelf.runRawSQL(clientsBySellings)
            return result
        }
    )
}

export { useClients, useMutateClient, useDeleteClients, clientAtom, useClientsBySellings };