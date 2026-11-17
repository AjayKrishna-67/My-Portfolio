import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Portrait from './Portrait';
import { CV_URL, DownloadIcon } from './cv';

export const GITHUB_URL = 'https://github.com/AjayKrishna-67';

export const LINKEDIN_URL =
  'https://www.linkedin.com/in/ajay-krishna-d-96043226a/';

// One form field: a bordered box with its label floating inside it. The
// label sits where the text goes until the field is focused or filled, then
// moves into a strip at the top of the box that the text never scrolls into.
// Once someone has left a field (or tried to send), an invalid value turns the
// border red, marks the field invalid and shows a hint under it.
function Field({ id, label, hint, multiline = false, className = '', ...props }) {
  const Tag = multiline ? 'textarea' : 'input';
  const control = useRef(null);
  const [touched, setTouched] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const check = (el) => setInvalid(!el.validity.valid);

  return (
    <div className={className}>
      <div
        onClick={() => control.current?.focus()}
        data-invalid={invalid || undefined}
        className="relative cursor-text rounded-xl border border-neutral-400 bg-white pt-7 shadow-sm transition-[border-color,box-shadow] duration-150 hover:border-neutral-500 focus-within:border-neutral-900 focus-within:ring-4 focus-within:ring-signal/45 has-[:disabled]:opacity-60 data-invalid:border-rose-600 data-invalid:hover:border-rose-600 data-invalid:focus-within:border-rose-600 data-invalid:focus-within:ring-rose-500/20 dark:border-neutral-600 dark:bg-neutral-950 dark:hover:border-neutral-400 dark:focus-within:border-neutral-200 dark:focus-within:ring-signal/30 dark:data-invalid:border-rose-400 dark:data-invalid:hover:border-rose-400 dark:data-invalid:focus-within:border-rose-400"
      >
        <Tag
          ref={control}
          id={id}
          placeholder=" "
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-hint` : undefined}
          onBlur={(e) => {
            if (e.target.value || touched) check(e.target);
            setTouched(true);
          }}
          onInput={(e) => {
            if (touched) check(e.target);
          }}
          onInvalid={() => {
            setTouched(true);
            setInvalid(true);
          }}
          className={`peer block w-full bg-transparent px-4 pb-2.5 text-lg text-neutral-900 outline-none dark:text-neutral-100 ${
            multiline ? 'min-h-36 resize-y' : ''
          }`}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute top-2.5 left-4 cursor-text text-sm font-semibold text-neutral-600 transition-all duration-150 peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-lg peer-placeholder-shown:font-normal peer-placeholder-shown:text-neutral-500 peer-focus:top-2.5 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-neutral-900 dark:text-neutral-400 dark:peer-placeholder-shown:text-neutral-400 dark:peer-focus:text-neutral-100"
        >
          {label}
        </label>
      </div>
      {invalid && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-rose-700 dark:text-rose-400">
          {hint}
        </p>
      )}
    </div>
  );
}

function Contact() {
  const form = useRef(null);
  // 'idle' | 'sending' | 'sent' | 'failed'
  const [status, setStatus] = useState('idle');

  const sendEmail = (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    const el = form.current;
    // Our own hints replace the browser's bubbles (the form is noValidate):
    // checkValidity marks each empty or wrong field, then focus the first.
    if (!el.checkValidity()) {
      el.querySelector('input:invalid, textarea:invalid')?.focus();
      return;
    }
    // When it was sent, in India time, for the {{time}} line in the email.
    el.elements.time.value = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });
    // sendForm reads the fields right away, before the fieldset is disabled.
    const sending = emailjs.sendForm(
      'service_i2fcp7l',
      'template_vt0ifp8',
      el,
      'GPLTnskmZk-yw7y2M',
    );
    setStatus('sending');
    sending.then(
      () => {
        el.reset();
        setStatus('sent');
      },
      (error) => {
        console.error('EmailJS:', error?.text ?? error);
        setStatus('failed');
      },
    );
  };

  // Editing the form again clears an old "sent" or "not sent" message.
  const clearStatus = () => {
    if (status === 'sent' || status === 'failed') setStatus('idle');
  };

  return (
    <section
      id="contact"
      className="border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10 lg:py-32">
        <div className="lg:col-span-5">
          <h2 className="display text-5xl sm:text-6xl">Contact</h2>
          <p className="mt-6 max-w-[40ch] text-xl text-neutral-600 dark:text-neutral-400">
            Have a role or a project in mind? Send a message and it goes
            straight to my inbox. You can also{' '}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="link-fill"
            >
              find me on LinkedIn
            </a>{' '}
            or{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="link-fill"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        {/* Second row on wide screens, so the form's top lines up with the
            portrait's. */}
        <div className="lg:col-span-5 lg:row-start-2">
          <Portrait />
          <a
            href={CV_URL}
            download="Ajay_Krishna_CV.pdf"
            className="mt-6 inline-flex items-center gap-2 rounded-md border-2 border-neutral-950 px-5 py-2.5 text-lg font-semibold transition-colors hover:bg-signal dark:border-white dark:hover:text-neutral-950"
          >
            <DownloadIcon />
            Download my CV (PDF)
          </a>
        </div>

        <form
          ref={form}
          onSubmit={sendEmail}
          onInput={clearStatus}
          noValidate
          className="self-start rounded-2xl border border-neutral-200 bg-neutral-100/70 p-5 shadow-sm sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-start-2 dark:border-neutral-800 dark:bg-neutral-900/60"
        >
          <input type="hidden" name="time" />
          <fieldset disabled={status === 'sending'} className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Send a message</legend>
            <Field
              id="contact-name"
              name="user_name"
              label="Your name"
              hint="Enter your name."
              autoComplete="name"
              required
            />
            <Field
              id="contact-email"
              name="user_email"
              type="email"
              label="Email"
              hint="Enter an email address, like name@example.com."
              autoComplete="email"
              required
            />
            <Field
              id="contact-subject"
              name="title"
              label="Subject"
              hint="Add a subject."
              required
              className="sm:col-span-2"
            />
            <Field
              id="contact-message"
              name="message"
              label="Message"
              hint="Write a message."
              multiline
              rows={6}
              required
              className="sm:col-span-2"
            />
          </fieldset>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="submit"
              aria-disabled={status === 'sending'}
              className="sunset-fill inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3.5 text-lg font-semibold text-neutral-950 shadow-sm transition-[filter,transform] duration-150 hover:brightness-105 focus-visible:outline-neutral-900 active:scale-[0.98] aria-disabled:cursor-wait aria-disabled:opacity-70 dark:focus-visible:outline-neutral-100"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
              <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 fill-current">
                <path d="M2.6 2.3a.75.75 0 0 1 .82-.1l14 7a.75.75 0 0 1 0 1.34l-14 7a.75.75 0 0 1-1.04-.9L4.5 10 2.38 3.36a.75.75 0 0 1 .22-1.06ZM5.9 10.75l-1.5 4.7L14.7 10 4.4 4.55l1.5 4.7h4.35a.75.75 0 0 1 0 1.5H5.9Z" />
              </svg>
            </button>
            <p role="status" className="flex items-center gap-2 text-lg">
              {status === 'sent' && (
                <>
                  <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-emerald-600 text-sm text-white">
                    ✓
                  </span>
                  Message sent. I&rsquo;ll reply by email.
                </>
              )}
              {status === 'failed' && (
                <span className="text-rose-700 dark:text-rose-400">
                  Message not sent. Check your connection and send it again.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
