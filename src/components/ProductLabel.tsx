import Link from 'next/link'

export type Item = {
  name?: string
  shopName?: string
  shopLink?: string
  shortInfo?: string
  img?: string
}
export default function ProductLabel({ item }: { item: Item }) {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="font-bold text-2xl ">{item?.name}</h1>
      <div className="flex items-start flex-wrap">
        {item?.shopName && (
          <Link
            href={item?.shopLink || '/'}
            className="bg-green-500 text-white px-2 py-1 rounded-2xl text-nowrap "
          >
            <p className="text-center">{item?.shopName}</p>
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
