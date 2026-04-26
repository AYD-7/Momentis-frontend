import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RegistrationModal from '../../components/ui/RegistrationModal';
import Spinner from '../../components/ui/Spinner';
import { getEventById } from '../../api';
import type { Event } from '../../types';
import HeaderEventDetails from './components/HeaderEventDetails';
import ContentEventDetails from './components/ContentEventDetails';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      getEventById(id)
        .then((res) => setEvent(res.data.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="pt-24"><Spinner text="Loading event..." /></div>;

  if (!event) { 
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="font-bold text-2xl mb-2" style={{ color: 'var(--ink)' }}>Event not found</h2>
          <Link to="/events" className="text-sm" style={{ color: 'var(--brand)' }}>← Back to events</Link>
        </div>
      </div>
    );
  }

 
  return (
    <>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: "var(--bg)",
          paddingTop: "5rem",
          paddingBottom: "4rem",
        }}
      >
        {/* HEADER BAND */}
        <HeaderEventDetails event={event} />

        {/* CONTENT */}
        <ContentEventDetails
          event={event}
          onRegister={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <RegistrationModal event={event} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
