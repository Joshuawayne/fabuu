
import React, { useState } from 'react';
import Button from './Button';
import SplitText from './SplitText';
import coonectImg from '@/assets/images/coonect.jpg';
// Removed ChatbotWidget import as it will be global

// Minimalist Social Icon Placeholders (same as Footer, consider centralizing if used often)
const MinimalSocialIconContact: React.FC<{ platform: string, className?: string }> = ({ platform, className="w-5 h-5" }) => {
  let iconPath = '';
  if (platform === 'instagram') iconPath = "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.85.185 1.432.384 1.939.208.528.477.972.923 1.417.446.446.89.715 1.416.923.507.198 1.09.333 1.94.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.85-.04 1.432-.185 1.94-.384.528-.208.972-.477 1.417-.923.446-.446.715-.89.923-1.417.198-.507.333-1.09.372-1.94C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.297c-.04-.85-.185-1.432-.384-1.94a3.926 3.926 0 0 0-.923-1.417A3.926 3.926 0 0 0 13.23.42c-.507-.198-1.09-.333-1.94-.372C10.445.01 10.173 0 8 0zm0 1.44c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485-.145.373-.319.64-.599.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.389-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.276-.373-.145-.64-.319-.92-.599-.28-.28-.453-.546-.598-.92-.11-.282-.24-.705-.275-1.485-.038-.843-.047-1.096-.047-3.231s.009-2.389.047-3.232c.035-.78.166-1.204.275-1.486.145-.373.319-.64.599.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.275C5.611 1.447 5.864 1.44 8 1.44zm0 3.923c-2.404 0-4.358 1.954-4.358 4.358s1.954 4.358 4.358 4.358 4.358-1.954 4.358-4.358S10.404 5.363 8 5.363zm0 7.272c-1.608 0-2.914-1.306-2.914-2.914s1.306-2.914 2.914-2.914 2.914 1.306 2.914 2.914-1.306 2.914-2.914 2.914zM12.602 4.144c-.628 0-1.137-.51-1.137-1.138 0-.628.51-1.137 1.137-1.137s1.138.51 1.138 1.137c0 .628-.51 1.138-1.138 1.138z";
  if (platform === 'pinterest') iconPath = "M8 0C3.58 0 0 3.58 0 8c0 3.433 2.228 6.324 5.26 7.49.037.19.06.392.06.602 0 .88-.28 1.708-.88 2.35-.41.44-.99.75-1.63.89-.1.02-.2.03-.3.03-.38 0-.73-.15-1.030-.4-.44-.38-.63-.9-.63-1.43 0-.43.14-.83.4-1.15.22-.27.48-.48.78-.64.3-.17.62-.28.96-.33.42-.06.85-.03 1.25.08.38.1.72.28 1.02.52.28.23.5.5.65.8.15.3.23.62.23.96 0 .5-.17.95-.5 1.32-.33.38-.75.64-1.22.78-.48.14-.98.15-1.48.03-.48-.1-.9-.3-1.25-.58-.35-.27-.6-.6-.74-.97-.13-.37-.16-.75-.1-1.12.08-.4.27-.78.52-1.1.25-.33.55-.6.9-.78.35-.2.72-.32 1.1-.38.4-.04.78-.02 1.15.08.37.1.7.28.98.5.28.22.5.5.65.8.14.3.22.62.22.95 0 .5-.17.95-.5 1.32-.33.37-.75.64-1.22.78-.48.14-.98.15-1.48.03-.48-.1-.9-.3-1.25-.57-.35-.28-.6-.6-.74-.98-.13-.37-.16-.75-.1-1.12.08-.4.27-.78.52-1.1.25-.33.55-.6.9-.78.35-.2.72-.32 1.1-.38.4-.04.78-.02 1.15.08.37.1.7.28.98.5.28.22.5.5.65.8.14.3.22.62.22.95Zm4.363-2.316c.35-.6.54-1.28.54-2.01 0-1.69-.8-3.19-2.09-4.14-.28-.2-.59-.36-.92-.48a3.021 3.021 0 0 0-1.16-.17c-1.85 0-3.35 1.5-3.35 3.35 0 .91.38 1.73 1.02 2.32.17.15.36.28.57.38.2.1.42.17.65.22.23.04.46.06.7.06.52 0 1.02-.13 1.45-.38.42-.25.75-.6 1-.98.24-.4.38-.83.38-1.31 0-.9-.4-1.7-1.07-2.3-.67-.6-1.53-.94-2.48-.94-1.63 0-3.03.9-3.79 2.25-.2.35-.3.73-.3 1.13 0 .5.14.97.42 1.37.28.4.63.73 1.04.96.4.23.85.36 1.32.36.47 0 .93-.13 1.32-.37.38-.24.68-.58.88-.98.16-.3.25-.63.25-.98 0-.5-.17-.95-.5-1.32C10.7 7.02 10.28 6.75 9.8 6.6c-.48-.14-.98-.15-1.48-.03C7.84 6.67 7.4 6.87 7.05 7.15c-.35.27-.6.6-.74.97-.13-.37-.16-.75-.1 1.12.08-.4.27-.78.52-1.1.25-.33.55-.6.9-.78.35-.2.72-.32 1.1-.38.4-.04.78-.02 1.15-.08.37.1.7-.28.98-.5.28.22.5.5.65.8.14.3.22.62.22.95Z";
  if (platform === 'facebook') iconPath = "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.604 0 8.05C0 12.096 2.94 15.336 6.75 16v-5.9H4.83V8.05h1.92V6.342c0-1.924 1.144-3.024 2.926-3.024.824 0 1.668.144 1.668.144v1.98h-1.002c-.932 0-1.22.546-1.22 1.132v1.442h2.21l-.356 2.05h-1.855V16c3.808-.664 6.75-3.904 6.75-7.951z";
  
  return (
    <svg viewBox="0 0 16 16" className={`${className} fill-current`}>
      <path d={iconPath}></path>
    </svg>
  );
};


const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formState);
    setSubmitMessage('Thank you! Your message has been sent.');
    setFormState({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 4000);
  };

  const commonSplitTextProps = {
    splitType: "words" as const,
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 40,
    duration: 0.5,
    ease: "power3.out",
    textAlign: "left" as const,
    className: "block",
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-luxury-bg">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Text Content */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <SplitText
              text="Connect."
              splitType="chars"
              from={{ opacity:0, scale:0.8, y:20 }}
              to={{ opacity:1, scale:1, y:0 }}
              delay={50}
              duration={0.7}
              ease="back.out(1.7)"
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-luxury-text mb-8 md:mb-10 block"
              textAlign="left"
            />
            
            <div className="mb-10 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
               <SplitText
                text="We're here for inquiries, collaborations, or just to say hello. Reach out and let us know how we can assist you."
                {...commonSplitTextProps}
                className="text-lg md:text-xl text-luxury-text/80 font-light leading-relaxed mb-10"
              />
            </div>

            <div className="space-y-6 text-luxury-text/90 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-accent mb-1.5">Email Us</h3>
                <a href="mailto:connect@fabu.com" className="text-base md:text-lg hover:text-luxury-accent transition-colors duration-300">connect@fabu.com</a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-accent mb-1.5">Call Us</h3>
                <a href="tel:+254792921969" className="text-base md:text-lg hover:text-luxury-accent transition-colors duration-300">+254 792 921 969</a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-accent mb-1.5">Our Studio</h3>
                <p className="text-base md:text-lg">Based in the heart of Nairobi City, by appointment.</p>
              </div>
            </div>
            
            <div className="mt-12 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-accent mb-3">Follow Our Journey</h3>
                <div className="flex space-x-5">
                    {/* Placeholder Social Icons - Replace with actual icons */}
                    <a href="#" aria-label="Instagram" className="text-luxury-text/70 hover:text-luxury-accent transition-colors"><MinimalSocialIconContact platform="instagram" className="w-6 h-6"/></a>
                    <a href="#" aria-label="Pinterest" className="text-luxury-text/70 hover:text-luxury-accent transition-colors"><MinimalSocialIconContact platform="pinterest" className="w-6 h-6"/></a>
                    <a href="#" aria-label="Facebook" className="text-luxury-text/70 hover:text-luxury-accent transition-colors"><MinimalSocialIconContact platform="facebook" className="w-6 h-6"/></a>
                </div>
            </div>
          </div>

          {/* Right Column: Atmospheric Image or Contact Form */}
          <div className="animate-fadeInUp order-first lg:order-last" style={{ animationDelay: '0.2s' }}>
             {/* Atmospheric Image */}
            <div className="hidden lg:block aspect-[4/5] rounded-lg overflow-hidden shadow-lg mb-12">
              <img 
                src={coonectImg}
                alt="Minimalist workspace aesthetic" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl border border-luxury-subtle/70">
              <h3 className="text-2xl font-semibold text-luxury-text mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-luxury-text/70 mb-1 tracking-wider uppercase">Full Name</label>
                  <input type="text" name="name" id="name" value={formState.name} onChange={handleInputChange} required className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-luxury-text/70 mb-1 tracking-wider uppercase">Email</label>
                  <input type="email" name="email" id="email" value={formState.email} onChange={handleInputChange} required className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-luxury-text/70 mb-1 tracking-wider uppercase">Message</label>
                  <textarea name="message" id="message" value={formState.message} onChange={handleInputChange} rows={4} required className="w-full bg-luxury-bg/50 border-luxury-subtle rounded p-3 focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50"></textarea>
                </div>
                <div className="pt-2">
                  <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
                {submitMessage && (
                  <p className={`mt-4 text-sm text-center ${submitMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* ChatbotWidget is now rendered globally in App.tsx */}
    </div>
  );
};

export default ContactPage;
