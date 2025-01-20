import { useLazyGetBreedsQuery } from "../features/catApiSlice";

export default function Cats() {
  const [trigger, { data, error, isLoading }] = useLazyGetBreedsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching breeds.</div>;

  return (
    <div>
      <h1>Items List</h1>
      {data?.data?.length ? (
        <ul data-testid="breeds-list">
          {data.data.map((item: any) => (
            <li key={item.id} data-testid="listitem">
              {item.breed}
            </li>
          ))}
        </ul>
      ) : (
        <div>No breeds available.</div>
      )}
      <button data-testid="fetch-button" onClick={() => trigger()}>
        Fetch Breeds
      </button>
    </div>
  );
}
