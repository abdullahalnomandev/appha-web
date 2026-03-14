"use client";
import { useState } from "react";
import { Calendar, Users, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Modal, Form, Input, Button, Space, Divider, Tooltip } from "antd";
import { EventInfoModal } from "./EventInfoModal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Event } from "@/types/main";
import { apiFetch } from "@/lib/api/api-fech";
import { revalidateTagType } from "@/components/partnerDashboard/exclusiveOffer/exclusiveOfferActions";


export default function EventsTab({ data }: { data: Event[] }) {
  const [eventList, setEventList] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [previewEvent, setPreviewEvent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const openGuestModal = (eventId: string) => {
    setSelectedEventId(eventId);
    form.resetFields();
    setGuestModalOpen(true);
  };

  const closeGuestModal = () => setGuestModalOpen(false);

  const handleSaveGuests = async () => {
    if (!selectedEventId) return;
    setIsLoading(true);

    try {
      // Validate the form first
      const values = await form.validateFields();
      const guests = values.guests || [];
      await apiFetch(
        "/event-registration",
        {
          method: "POST",
          body: JSON.stringify({ event: selectedEventId, guests }),
        },
        "client"
      );

      const updatedEvents = eventList.map((e: any) => {
        if (e._id === selectedEventId) {
          e.guests = [...(e.guests || []), ...guests];
          e.attendees = (e.attendees || 0) + guests.length;
        }
        return e;
      });
      revalidateTagType("event");
      setEventList(updatedEvents);
      setIsLoading(false);
      toast.success("Event request submitted successfully!");
      closeGuestModal();
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message || "Failed to submit event request.");
      console.log("Validation or submission failed:", err);
    }
  };

  const openPreviewModal = (event: any) => {
    setPreviewEvent(event);
    setModalOpen(true);
  };

  const closePreviewModal = () => setModalOpen(false);
  dayjs.extend(customParseFormat);

  console.log('data', data);

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-bold text-black">Upcoming Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((e) => (
          <div
            key={e._id}
            className="rounded-lg border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-gray-900 font-bold text-base">{e.name}</h4>
                <p className="text-gray-500 text-sm">{e.title}</p>
              </div>
              <Button
                type="link"
                className="underline text-gray-600"
                onClick={() => openPreviewModal(e)}
              >
                Preview
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="w-3 h-3 text-gray-400" /> {e.location}
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="w-3 h-3 text-gray-400" />
              {dayjs(e.eventDate).format("DD MMM YYYY")} · {dayjs(e.eventTime, "HH:mm").format("hh:mm A")}
            </div>
            <Tooltip
              title={
                e.joinStatus === "pending"
                  ? "Your booking request is waiting for approval"
                  : e.joinStatus === "confirmed"
                    ? "Your booking request has been approved"
                    : e.joinStatus === "cancelled"
                      ? "Your booking request was cancelled"
                      : e.joinStatus === "time_exceeded"
                        ? "Booking time has expired"
                        : "Click to request joining this event"
              }
            >
              <Button
                type="primary"
                size="large"
                style={{
                  width: "fit-content",
                  marginTop: 8,
                  background:
                    e.joinStatus === "pending"
                      ? "#faad14"
                      : e.joinStatus === "time_exceeded"
                        ? "#ff4d4f"
                        : e.joinStatus === "cancelled"
                          ? "#ff4d4f"
                          : e.joinStatus === "confirmed"
                            ? "#52c41a"
                            : undefined,
                  color:
                    e.joinStatus === "pending" ||
                      e.joinStatus === "time_exceeded" ||
                      e.joinStatus === "cancelled" ||
                      e.joinStatus === "confirmed"
                      ? "#fff"
                      : undefined,
                  borderColor:
                    e.joinStatus === "pending"
                      ? "#faad14"
                      : e.joinStatus === "time_exceeded"
                        ? "#ff4d4f"
                        : e.joinStatus === "cancelled"
                          ? "#ff4d4f"
                          : e.joinStatus === "confirmed"
                            ? "#52c41a"
                            : undefined,
                }}
                disabled={
                  e.joinStatus === "pending" ||
                  e.joinStatus === "confirmed" ||
                  e.joinStatus === "time_exceeded" ||
                  e.joinStatus === "cancelled"
                }
                onClick={() => openGuestModal(e._id)}
              >
                {e.joinStatus === "pending"
                  ? "Pending"
                  : e.joinStatus === "confirmed"
                    ? "Confirmed"
                    : e.joinStatus === "cancelled"
                      ? "Cancelled"
                      : e.joinStatus === "time_exceeded"
                        ? "Time Exceeded"
                        : "Request Event"}
              </Button>
            </Tooltip>
          </div>
        ))}
      </div>
      {/* Guest Modal */}
      <Modal
        title="Add Guests (Optional)"
        open={guestModalOpen}
        onCancel={closeGuestModal}
        onOk={handleSaveGuests}
        okText="Submit"
        confirmLoading={isLoading}
        cancelText="Cancel"
        width={700}
      >
        <Form form={form} layout="vertical" initialValues={{ guests: [] }}>
          <Form.List name="guests">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="border p-4 rounded mb-4 relative border-gray-300 bg-gray-50">
                    <Button
                      type="text"
                      danger
                      icon={<Trash2 />}
                      className="absolute top-2 right-2"
                      onClick={() => remove(name)}
                    />
                    <Divider orientation="left">Guest {name + 1}</Divider>
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        label="Full Name"
                      >
                        <Input placeholder="John Doe" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "email"]}
                        label="Email"
                        rules={[{ type: "email", message: "Enter a valid email" }]}
                      >
                        <Input placeholder="john@example.com" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "phone"]}
                        label="Phone"
                      >
                        <Input placeholder="+1234567890" />
                      </Form.Item>
                    </Space>
                  </div>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Guest
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* Event Preview Modal */}
      <EventInfoModal event={previewEvent} open={modalOpen} onClose={closePreviewModal} />
    </div>
  );
}