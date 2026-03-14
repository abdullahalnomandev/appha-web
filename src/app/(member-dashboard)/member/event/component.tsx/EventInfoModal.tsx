"use client";

import { Modal } from "antd";
import dayjs from "dayjs";
import { getImage } from "@/lib/api/api-fech";

interface Props {
  event: any | null;
  open: boolean;
  onClose: () => void;
}

export const formatTime12Hour = (time: string) => {
  if (!time) return "-";
  const [h, m] = time.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return time;
  let hour = h % 12 || 12;
  let ampm = h < 12 ? "AM" : "PM";
  return `${hour.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")} ${ampm}`;
};

export const EventInfoModal: React.FC<Props> = ({ event, open, onClose }) => {
  if (!event) return null;
  console.log('THIS IS EVENT', event)
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      styles={{body:{ padding: 0, borderRadius: 16, overflow: "hidden", background: "#fff" }}}
      style={{ borderRadius: 16, padding: 0 }}
      title={null}
      destroyOnHidden 
    >
      <div style={{ borderRadius: 16, overflow: "hidden", background: "#fff", fontFamily: "inherit" }}>
        {/* Image */}
        <div style={{ width: "100%", marginTop: 20, background: "#f6f8fa", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {event.image ? (
            <img src={getImage(event.image)} alt={event.name} style={{ width: "100%", height: 220, objectFit: "contain" }} />
          ) : (
            <div style={{ width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 22 }}>
              No image
            </div>
          )}
        </div>

        {/* Main Info */}
        <div style={{ padding: "20px 22px 0 22px", background: "#fff" }}>
          <div style={{ fontSize: 19, fontWeight: 600, color: "#294183", marginBottom: 4 }}>{event.title}</div>
          <div style={{ color: "#555a6a", fontWeight: 500, fontSize: 16, marginBottom: 12 }}>{event.name}</div>

          <div style={{ marginBottom: 10, color: "#fa541c", fontSize: 15, fontWeight: 500, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
            <span><b style={{ color: "#25396d" }}>Location:</b> <span style={{ color: "#fa541c" }}>{event.location || "-"}</span></span>
            <span><b style={{ color: "#25396d" }}>Date:</b> <span style={{ color: "#294183" }}>{event.eventDate ? dayjs(event.eventDate).format("DD MMM YYYY") : "-"}</span></span>
            <span><b style={{ color: "#25396d" }}>Time:</b> <span style={{ color: "#294183" }}>{event.eventTime ? formatTime12Hour(event.eventTime) : "-"}</span></span>
          </div>

          <div style={{ fontWeight: 500, color: "#253347", fontSize: 16, marginBottom: 0 }}>Description</div>
          <div style={{ color: "#777D8F", fontSize: 14, marginBottom: 18, marginTop: 2, minHeight: 22, maxHeight: 300, overflowY: "auto" }}>
            {"description" in event && (event as any).description ? (
              <span dangerouslySetInnerHTML={{ __html: (event as any).description }} />
            ) : (
              <span style={{ color: "#bbb" }}>No description provided.</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};