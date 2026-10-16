import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { benefits, brand, contact, gallery, menuCategories, menuItems, services } from './data/site';
import './App.css';
type Enquiry = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  guests: string;
  requirements: string;
  message: string;
};

const blankEnquiry: Enquiry = { name: '', phone: '', email: '', eventType: '', date: '', location: '', guests: '', requirements: '', message: '' };

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof menuCategories)[number]>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Enquiry>(blankEnquiry);
  const [formError, setFormError] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [sentReady, setSentReady] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const visibleMenu = activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory);
  const item = lightboxIndex === null ? null : gallery[lightboxIndex];

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? 0 : (i + 1) % gallery.length));
      if (event.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? 0 : (i - 1 + gallery.length) % gallery.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const jumpToEnquiry = () => {
    setMobileOpen(false);
    document.querySelector('#enquire')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 550);
  };

  const setField = (key: keyof Enquiry, value: string) => setForm((previous) => ({ ...previous, [key]: value }));

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormStatus('');
    setSentReady(false);
    if (!form.name.trim() || !form.phone.trim() || !form.eventType || !form.date || !form.location.trim() || !form.guests) {
      setFormError('Please complete each required field before continuing.');
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('Please enter a valid email address, or leave the email field blank.');
      return;
    }
    if (!contact.whatsappNumber || !/^\d{8,15}$/.test(contact.whatsappNumber)) {
      setFormStatus('Your enquiry is ready, but messaging is not configured yet. No message was sent. Please contact the business directly once contact details are added.');
      return;
    }
    const text = [
      `Hello ${brand.name}, I'd like to enquire about catering.`,
      `Name: ${form.name}`, `Phone: ${form.phone}`, form.email && `Email: ${form.email}`,
      `Event: ${form.eventType}`, `Date: ${form.date}`, `Location: ${form.location}`,
      `Approx. guests: ${form.guests}`, form.requirements && `Food requirements: ${form.requirements}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSentReady(true);
    setFormStatus('Your enquiry is ready in WhatsApp. Review the details there and send when you’re ready.');
  };

  const navLinks = [['Our approach', '#story'], ['Catering', '#catering'], ['Sample menu', '#menu'], ['Gallery', '#gallery']] as const;

  return (
    <main>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Muniyappa Caterings home" data-testid="link-brand">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span><strong>Muniyappa</strong><small>CATERINGS</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${href.slice(1)}`}>{label}</a>)}
        </nav>
        <button className="header-cta" onClick={jumpToEnquiry} data-testid="button-header-enquire">Plan your occasion <ArrowUpRight size={15} /></button>
        <button className="mobile-toggle" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
        {mobileOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}<ArrowRight size={16} /></a>)}
          <button onClick={jumpToEnquiry}>Plan your occasion <ArrowUpRight size={15} /></button>
        </nav>}
      </header>

      <section className="hero" id="top" aria-labelledby="hero-heading">
        <img className="hero-image" src="/images/hero-feast.jpg" alt="Demonstration South Indian wedding feast laid on banana leaves" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light-eyebrow"><span /> SOUTH INDIAN HOSPITALITY</p>
          <h1 id="hero-heading">A table set<br />with <em>care.</em></h1>
          <p className="hero-lede">Food, family and the lovely feeling of being looked after. Let’s bring it all together for your occasion.</p>
          <a className="button button-gold" href="#catering">Explore catering <ArrowDown size={16} /></a>
        </div>
        <div className="hero-caption">A FEAST IS MORE THAN A MEAL <span>—</span> IT’S HOW WE WELCOME YOU.</div>
        <div className="hero-index"><span>01</span> / 04</div>
        <span className="hero-stamp">MADE FOR<br />GATHERING</span>
      </section>

      <section className="intro section-wrap" id="story">
        <div className="intro-label"><span className="ornament">✳</span><span>THE MUNIYAPPA WAY</span></div>
        <div className="intro-content">
          <h2>Good food has a way<br />of bringing us <em>closer.</em></h2>
          <div className="intro-bottom">
            <p>{brand.intro}</p>
            <p>{brand.about}</p>
          </div>
          <a className="text-link" href="#enquire">Tell us what you’re celebrating <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="services section-wrap" id="catering">
        <div className="section-heading">
          <div><p className="eyebrow">THOUGHTFUL FOOD, FOR EVERY GATHERING</p><h2>Made for the <em>moments</em><br className="desktop-only" /> that matter.</h2></div>
          <p>Big family milestones or a table full of colleagues—let’s make everyone feel welcome.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => <article className={`service-card service-card-${index + 1}`} key={service.title} data-testid={`card-service-${index + 1}`}>
            <div className="service-photo"><img loading="lazy" src={service.image} alt={`${service.title} demonstration catering image`} /><span className="image-note">DEMONSTRATION IMAGE</span><span className="service-number">0{index + 1}</span></div>
            <div className="service-copy"><p className="eyebrow">{service.tag}</p><h3>{service.title}</h3><p>{service.text}</p><a href="#enquire" aria-label={`Enquire about ${service.title}`} data-testid={`link-service-enquire-${index + 1}`}><ArrowUpRight size={18} /></a></div>
          </article>)}
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="menu-inner">
          <div className="menu-aside">
            <p className="eyebrow light-eyebrow">A TASTE OF THE TABLE</p>
            <h2>Tradition,<br />with room<br />for <em>your own.</em></h2>
            <p>Here’s a small sample of dishes we can talk through together. Menus are tailored to your gathering and preferences.</p>
            <span className="menu-disclaimer">DEMONSTRATION MENU · SAMPLE CONTENT</span>
          </div>
          <div className="menu-list-wrap">
            <div className="menu-tabs" role="tablist" aria-label="Filter demonstration menu">
              {menuCategories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} data-testid={`button-menu-${category.toLowerCase()}`}>{category}</button>)}
            </div>
            <div className="menu-list" aria-live="polite">
              {visibleMenu.map((dish, index) => <article className="dish-row" key={dish.name} data-testid={`menu-item-${dish.name.toLowerCase().replaceAll(' ', '-')}`}>
                <span className="dish-index">{String(index + 1).padStart(2, '0')}</span><div><h3>{dish.name}</h3><p>{dish.detail}</p></div><span className="dish-category">{dish.category}</span>
              </article>)}
            </div>
            <p className="menu-footnote">Every menu is a conversation, not a fixed list. <a href="#enquire">Let’s plan yours <ArrowRight size={14} /></a></p>
          </div>
        </div>
      </section>

      <section className="promise section-wrap">
        <div className="promise-heading"><p className="eyebrow">SMALL DETAILS. A BIG DIFFERENCE.</p><h2>Care is in the <em>bringing together.</em></h2></div>
        <div className="benefit-list">
          {benefits.map((benefit) => <article className="benefit-row" key={benefit.n} data-testid={`benefit-${benefit.n}`}>
            <span>{benefit.n}</span><h3>{benefit.title}</h3><p>{benefit.text}</p>
          </article>)}
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-top section-wrap"><div><p className="eyebrow">A FEEL FOR THE TABLE</p><h2>Gathered around <em>good things.</em></h2></div><span>DEMONSTRATION VISUALS<br />NOT MUNIYAPPA EVENT PHOTOGRAPHS</span></div>
        <div className="gallery-grid">
          {gallery.map((photo, index) => <button className={`gallery-item gallery-item-${index + 1}`} key={photo.src} onClick={() => setLightboxIndex(index)} aria-label={`Open image: ${photo.label}`} data-testid={`button-gallery-${index + 1}`}>
            <img loading="lazy" src={photo.src} alt={photo.alt} /><span className="gallery-zoom"><ArrowUpRight size={20} /></span><span className="gallery-label">{photo.label}</span><span className="image-note">SAMPLE IMAGE</span>
          </button>)}
        </div>
      </section>

      <section className="enquiry-section" id="enquire">
        <div className="enquiry-intro">
          <p className="eyebrow light-eyebrow">LET’S BEGIN WITH A CONVERSATION</p>
          <h2>Tell us about<br />your <em>occasion.</em></h2>
          <p>Share a few details and we’ll help shape a menu and service that feel right for your gathering.</p>
          <div className="enquiry-aside-note"><span className="ornament">✳</span><span>NO OCCASION IS TOO SMALL<br />TO MAKE SOMEONE FEEL SPECIAL.</span></div>
        </div>
        <form className="enquiry-form" onSubmit={submitEnquiry} noValidate>
          <p className="form-intro">A few details to get us started <span>Fields marked * are required</span></p>
          <div className="form-grid">
            <label>Your name *<input ref={nameRef} value={form.name} onChange={(e) => setField('name', e.target.value)} autoComplete="name" required placeholder="Name" data-testid="input-name" /></label>
            <label>Phone number *<input value={form.phone} onChange={(e) => setField('phone', e.target.value)} autoComplete="tel" type="tel" required placeholder="Your number" data-testid="input-phone" /></label>
            <label className="full-field">Email address <span className="optional">OPTIONAL</span><input value={form.email} onChange={(e) => setField('email', e.target.value)} autoComplete="email" type="email" placeholder="you@example.com" data-testid="input-email" /></label>
            <label>What are you celebrating? *<select value={form.eventType} onChange={(e) => setField('eventType', e.target.value)} required data-testid="select-event-type"><option value="">Choose an occasion</option><option>Wedding or muhurtham</option><option>Family celebration</option><option>Corporate gathering</option><option>Other occasion</option></select></label>
            <label>Event date *<input value={form.date} onChange={(e) => setField('date', e.target.value)} type="date" required data-testid="input-date" /></label>
            <label>Event location *<input value={form.location} onChange={(e) => setField('location', e.target.value)} required placeholder="Town or venue" data-testid="input-location" /></label>
            <label>Approx. guest count *<select value={form.guests} onChange={(e) => setField('guests', e.target.value)} required data-testid="select-guests"><option value="">Choose a range</option><option>Under 50</option><option>50–100</option><option>101–250</option><option>251–500</option><option>More than 500</option><option>Not sure yet</option></select></label>
            <label className="full-field">Food requirements <span className="optional">OPTIONAL</span><input value={form.requirements} onChange={(e) => setField('requirements', e.target.value)} placeholder="Vegetarian, allergies, or other preferences" data-testid="input-requirements" /></label>
            <label className="full-field">Anything else we should know? <span className="optional">OPTIONAL</span><textarea rows={3} value={form.message} onChange={(e) => setField('message', e.target.value)} placeholder="A little more about the day…" data-testid="input-message" /></label>
          </div>
          {formError && <p className="form-message error" role="alert" data-testid="status-form-error">{formError}</p>}
          {formStatus && <p className={`form-message ${sentReady ? 'success' : 'notice'}`} role="status" data-testid="status-enquiry">{sentReady && <Check size={16} />}{formStatus}</p>}
          <button className="button button-gold form-submit" type="submit" data-testid="button-submit-enquiry">Prepare my enquiry <ArrowRight size={16} /></button>
          <p className="form-privacy">This demonstration form does not store your details. WhatsApp opens only when a business number is configured.</p>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-top"><a className="brand-lockup footer-brand" href="#top" data-testid="link-footer-brand"><span className="brand-mark">M</span><span><strong>Muniyappa</strong><small>CATERINGS</small></span></a><p>Good food. Generous hearts.<br />A place for everyone at the table.</p><a className="footer-back" href="#top">Back to top <ArrowUpRight size={15} /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Muniyappa Caterings</span><span className="demo-credit">A CLIENT DEMONSTRATION BY <strong>GenZ Edu Tech</strong></span><span className="footer-place">{contact.location || 'Business location to be added'}</span></div>
      </footer>

      {item && lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setLightboxIndex(null)} data-testid="gallery-lightbox">
        <button className="lightbox-close" aria-label="Close image viewer" onClick={() => setLightboxIndex(null)} data-testid="button-lightbox-close"><X /></button>
        <button className="lightbox-arrow lightbox-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length); }} data-testid="button-lightbox-previous"><ChevronLeft /></button>
        <figure onClick={(e) => e.stopPropagation()}><img src={item.src} alt={item.alt} /><figcaption>{item.label} <span>DEMONSTRATION VISUAL</span></figcaption></figure>
        <button className="lightbox-arrow lightbox-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % gallery.length); }} data-testid="button-lightbox-next"><ChevronRight /></button>
      </div>}
    </main>
  );
}

export default App;
