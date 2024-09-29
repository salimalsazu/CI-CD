export default function ProductListTable({ product }: any) {
  const totalPrice = product?.price * product?.quantity;

  return (
    <tbody className="divide-y !divide-gray-50 bg-white">
      <tr>
        <td className="whitespace-nowrap flex flex-col  py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
          <span>{product?.productName}</span>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {product?.quantity}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {product?.price}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          $ {totalPrice}
        </td>
      </tr>
    </tbody>
  );
}
