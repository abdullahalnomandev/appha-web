import { Phone, Mail, MapPin, Globe } from "lucide-react";

const contacts = [
  { name: "ALPHA Support", role: "Member Services", phone: "+971 4 123 4567", email: "members@alpha-club.ae", location: "DIFC, Dubai" },
  { name: "Events Team", role: "Event Coordination", phone: "+971 4 123 4568", email: "events@alpha-club.ae", location: "DIFC, Dubai" },
  { name: "Partner Relations", role: "Partnership Inquiries", phone: "+971 4 123 4569", email: "partners@alpha-club.ae", location: "DIFC, Dubai" },
];

const ContactsTab = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold text-gray-900">Contacts</h3>
      <p className="text-sm text-gray-500">Get in touch with the ALPHA team</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {contacts.map((c) => (
        <div key={c.name} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <h4 className="text-gray-900 font-semibold">{c.name}</h4>
          <p className="text-xs text-amber-500 mb-3">{c.role}</p>
          <div className="space-y-2 text-xs text-gray-600">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {c.phone}</span>
            <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> {c.email}</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {c.location}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-lg border border-amber-200 p-6 text-center shadow-sm">
      <Globe className="w-8 h-8 text-amber-500 mx-auto mb-2" />
      <h4 className="text-gray-900 font-semibold mb-1">Visit Us Online</h4>
      <p className="text-sm text-gray-500">www.alpha-club.ae</p>
    </div>
  </div>
);

export default ContactsTab;