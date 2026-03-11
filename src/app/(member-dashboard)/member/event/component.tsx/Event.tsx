"use client";
import { useState } from "react";
import { Calendar, Users, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Modal, Form, Input, Button, Space, Divider } from "antd";
import { EventInfoModal } from "./EventInfoModal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const events = [
  {
    "_id": "698a0ea6f24b53030aaca44d",
    "name": "🥂 ALPHA LAUNCH BRUNCH & AFTER PARTY",
    "title": "Welcome to ALPHA. Where leaders connect, celebrate, and elevate",
    "image": "https://www.aiub.edu/Files/Uploads/aiub-environment-club.png",
    "location": "LAR LAR, Zabeel House, The Greens",
    "description": "<div dir=\"auto\" style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small;\">The official ALPHA Launch Event...</div>",
    "eventDate": "2026-02-27T20:00:00.000Z",
    "eventTime": "13:00",
    "createdAt": "2026-02-09T16:43:18.587Z",
    "updatedAt": "2026-02-09T16:43:18.587Z",
    "eventCount": 0,
    "attendees": 0,
    "guests": []
  }
];

export default function EventsTab() {
  const [eventList, setEventList] = useState(events);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [previewEvent, setPreviewEvent] = useState<any | null>(null);

  const [form] = Form.useForm();

  const openGuestModal = (eventId: string) => {
    setSelectedEventId(eventId);
    form.resetFields();
    setGuestModalOpen(true);
  };

  const closeGuestModal = () => setGuestModalOpen(false);

  const handleSaveGuests = async () => {
    try {
      const values = await form.validateFields();
      const guests = values.guests || [];
      if (!selectedEventId) return;

      const updatedEvents = eventList.map((e: any) => {
        if (e._id === selectedEventId) {
          e.guests = [...e.guests, ...guests];
          e.attendees += guests.length;
        }
        return e;
      });

      setEventList(updatedEvents);
      toast.success("Event request submitted successfully!");
      closeGuestModal();
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  const openPreviewModal = (event: any) => {
    setPreviewEvent(event);
    setModalOpen(true);
  };

  const closePreviewModal = () => setModalOpen(false);
  dayjs.extend(customParseFormat);

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-bold text-white">Upcoming Events</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventList.map((e) => (
          <div
            key={e._id}
            className="bg-navy-light rounded-lg border border-white/10 p-5 flex flex-col gap-3"
          >
            <div className="flex justify-between">
              <h4 className="text-white font-semibold">{e.title}</h4>
              <Button type="link" className="underline" onClick={() => openPreviewModal(e)}>
                Preview
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <MapPin className="w-3 h-3" /> {e.location}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Calendar className="w-3 h-3" />
                {dayjs(e.eventDate).format("DD MMM YYYY")} ·   {dayjs(e.eventTime, "HH:mm").format("hh:mm A")}
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              style={{ width: "fit-content", marginTop: 8 }}
              onClick={() => openGuestModal(e._id)}
            >
              Request Event
            </Button>
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
                        name={[name, "fullName"]}
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
                        name={[name, "contactNumber"]}
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