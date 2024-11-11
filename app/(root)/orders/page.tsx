import { getOrdersByEvent } from "@/lib/actions/order.actions"
import { IOrderItem } from "@/lib/database/models/order.models"
import { formatDateTime } from "@/lib/utlis"
import { SearchParamProps } from "@/types"
import Link from "next/link"

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || ""
  const searchText = (searchParams?.query as string) || ""

  const orders = await getOrdersByEvent({ eventId, searchString: searchText })

  return (
    <>
      <section className="blue_container !min-h-[230px] ">
        <h3 className="heading ">Orders</h3>
        <p className="sub-heading">Check all orders for this event</p>
      </section>

      {/* <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section> */}

      <section className="section_container overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Event Title
              </th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="text-base border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.eventTitle}
                      </td>
                      <td className="min-w-[150px] py-4">
                        <Link href={`/profile/${row.buyerId}`}>
                          @{row.buyer}
                        </Link>
                      </td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt)}
                      </td>
                      <td className="min-w-[100px] py-4 text-right font-semibold">
                        Rs. {row.totalAmount}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Orders
