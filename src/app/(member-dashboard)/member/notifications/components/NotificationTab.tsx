"use client";

import { revalidateTagType } from "@/components/partnerDashboard/exclusiveOffer/exclusiveOfferActions";
import { apiFetch } from "@/lib/api/api-fech";
import { INotification, Pagination as PaginationType } from "@/types/main";
import { Pagination } from "antd";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  data: INotification[] | undefined;
  pagination: PaginationType;
}

const NotificationsTab = ({ data, pagination }: Props) => {
  const router = useRouter();

  const markSeen = async (n: INotification) => {
    try {
      if (!n.seen) {
        await apiFetch(
          `/notification/${n._id}`,
          { method: "PATCH" },
          "client"
        );

        revalidateTagType("notification");
      }

      if (n.path === "/event-registration") {
        router.push("/member/event");
      }
    } catch (error) {
      console.error("Failed to mark notification as seen", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
        <p className="text-sm text-gray-500">
          Stay updated with offers, events, and announcements
        </p>
      </div>

      <div className="space-y-3">
        {data?.length ? (
          data.map((n) => (
            <div
              key={n._id}
              onClick={() => markSeen(n)}
              className={`cursor-pointer bg-white rounded-lg border p-4 flex items-start gap-4 transition hover:bg-gray-50 ${n.seen ? "border-gray-200" : "border-amber-200 shadow-sm"
                }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.seen ? "bg-gray-100" : "bg-amber-100"
                  }`}
              >
                <Bell
                  className={`w-4 h-4 ${n.seen ? "text-gray-400" : "text-amber-500"
                    }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-semibold ${n.seen ? "text-gray-500" : "text-gray-900"
                      }`}
                  >
                    {n.title}
                  </h4>

                  {!n.seen && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>

                <span className="text-xs text-gray-400 mt-1 block">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 text-center py-10">
            No notifications found
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.total > 10 && (
        <div className="flex justify-end pt-6">
          <Pagination
            current={pagination.page}
            pageSize={1}
            total={pagination.total}
            showSizeChanger={false}
            onChange={(p) => {
              router.push(`/member/notifications?page=${p}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationsTab;