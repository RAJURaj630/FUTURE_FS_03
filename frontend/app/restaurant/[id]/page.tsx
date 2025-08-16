import RestaurantDetail from './RestaurantDetail';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ];
}

// The page component's props type is exactly what Next.js expects:
export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the promise here:
  const resolvedParams = await params;
  return <RestaurantDetail restaurantId={resolvedParams.id} />;
}
