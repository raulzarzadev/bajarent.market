import Link from 'next/link'

export type Item = {
  id: string
  name?: string
  shopName?: string
  shopLink?: string
  shortInfo?: string
  img?: string
  itemLink?: string
  description?: string
}
export default function ItemLa({ item }: { item: Item }) {
  return (
    <div className="flex flex-col w-full h-full">
      <Link href={`${item.shopLink}/${item?.id}`}>
        <h1 className="font-bold text-2xl ">{item?.name}</h1>
      </Link>
      <div className="flex items-start flex-wrap">
        {item?.shopName && (
          <Link
            href={item?.shopLink || '/'}
            className="bg-green-500 text-white px-2 py-1 rounded-2xl text-nowrap max-w-full  "
          >
            <p className="text-center truncate">{item?.shopName}</p>
          </Link>
        )}
        {item?.shortInfo && (
          <div className="ml-2 ">
            <p>{item?.shortInfo}</p>
          </div>
        )}
      </div>
    </div>
  )
}
