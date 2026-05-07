/* ═══════════════════════════════════════════════════
   VAYRA DIGITAL AGENCY — MAIN JAVASCRIPT
   ═══════════════════════════════════════════════════ */

'use strict';

// ─── LOADING SCREEN ──────────────────────────────────────────
(function initLoader() {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  if (!loader) return;

  // Animate bar
  requestAnimationFrame(() => {
    loaderBar.style.width = '100%';
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
      initChartAnimation();
    }, 1500);
  });
})();

// ─── SCROLL PROGRESS ─────────────────────────────────────────
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
})();

// ─── CUSTOM CURSOR ───────────────────────────────────────────
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor interactions
  document.querySelectorAll('a, button, .quick-reply, .toggle-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.width = '50px'; ring.style.height = '50px';
      ring.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.width = '30px'; ring.style.height = '30px';
      ring.style.opacity = '1';
    });
  });
})();

// ─── NAVBAR ──────────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  function closeMobile() {
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', () => {
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  mobileClose?.addEventListener('click', closeMobile);
  mobileLinks.forEach(l => l.addEventListener('click', closeMobile));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

// ─── FLOATING PARTICLES ──────────────────────────────────────
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = (Math.random() * 2 + 2) + 'px';
    p.style.setProperty('--size', size);
    p.style.setProperty('--dur', (Math.random() * 12 + 8) + 's');
    p.style.setProperty('--delay', '-' + (Math.random() * 15) + 's');
    p.style.setProperty('--x', (Math.random() * 100) + '%');
    p.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    container.appendChild(p);
  }
})();

// ─── PARALLAX HERO GRID ───────────────────────────────────────
(function initParallax() {
  const grid = document.getElementById('heroGrid');
  if (!grid) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    grid.style.transform = `translateY(${y * 0.2}px)`;
  }, { passive: true });
})();

// ─── SCROLL REVEAL ───────────────────────────────────────────
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ─── NETWORK CANVAS ──────────────────────────────────────────
(function initNetworkCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes, anim;

  function resize() {
    const wrap = canvas.parentElement;
    W = canvas.width = wrap.offsetWidth;
    H = canvas.height = wrap.offsetHeight;
    buildNodes();
  }

  function buildNodes() {
    nodes = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.5 + 1.5,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    // bg
    ctx.fillStyle = 'rgba(5,10,20,0.9)';
    ctx.fillRect(0, 0, W, H);

    // grid lines
    ctx.strokeStyle = 'rgba(15,32,64,0.4)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // update & connect
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      n.pulse += 0.04;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.5;
          // animated data flow
          const progress = ((t * 0.0006 + (i + j) * 0.2) % 1);
          const px = nodes[i].x + dx * progress;
          const py = nodes[i].y + dy * progress;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${alpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // data packet
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,255,${alpha * 1.5})`;
          ctx.fill();
        }
      }
    }

    // nodes
    nodes.forEach(n => {
      const glow = Math.sin(n.pulse) * 0.4 + 0.6;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
      grad.addColorStop(0, `rgba(0,212,255,${glow * 0.8})`);
      grad.addColorStop(1, 'rgba(0,212,255,0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${glow})`;
      ctx.fill();
    });

    // floating hexagon shapes
    for (let i = 0; i < 3; i++) {
      const angle = t * 0.0003 + i * (Math.PI * 2 / 3);
      const cx = W / 2 + Math.cos(angle) * (W * 0.2);
      const cy = H / 2 + Math.sin(angle) * (H * 0.2);
      drawHex(ctx, cx, cy, 20 + i * 6, t * 0.0005 + i);
    }

    anim = requestAnimationFrame(draw);
  }

  function drawHex(ctx, cx, cy, r, rot) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
      i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
              : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0,102,255,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  resize();
  requestAnimationFrame(draw);
  window.addEventListener('resize', () => { resize(); });
})();

// ─── DASHBOARD CHART ─────────────────────────────────────────
function initChartAnimation() {
  const line = document.getElementById('chartLine');
  const fill = document.getElementById('dashProgressFill');
  if (line) {
    line.style.strokeDashoffset = '0';
    line.style.transition = 'stroke-dashoffset 1.5s ease';
  }
  setTimeout(() => {
    if (fill) fill.style.width = '94%';
  }, 300);
}

// Observer for dashboard when hero comes into view
(function observeDashboard() {
  const dash = document.querySelector('.dashboard-card');
  if (!dash) return;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      initChartAnimation();
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(dash);
})();

// ─── PROCESS TIMELINE ────────────────────────────────────────
(function initTimeline() {
  const timelineSection = document.getElementById('timeline');
  const fill = document.getElementById('timelineFill');
  if (!timelineSection || !fill) return;

  const nodes = [0, 1, 2, 3].map(i => document.getElementById('node' + i));

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      // Animate line fill
      setTimeout(() => { fill.style.width = '100%'; }, 200);
      // Light up nodes sequentially
      nodes.forEach((node, i) => {
        setTimeout(() => {
          node?.classList.add('active');
        }, 400 + i * 300);
      });
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(timelineSection);
})();

(function initPricingToggle() {
  const toggle = document.getElementById('pricingToggle');
  const monthlyPrices = document.querySelectorAll('.monthly-price');
  const onetimePrices = document.querySelectorAll('.onetime-price');
  if (!toggle) return;

  let isOnetime = false;
  toggle.addEventListener('click', () => {
    isOnetime = !isOnetime;
    toggle.classList.toggle('active', isOnetime);
    monthlyPrices.forEach(p => p.style.display = isOnetime ? 'none' : '');
    onetimePrices.forEach(p => p.style.display = isOnetime ? '' : 'none');
  });
})();

// ─── CONTACT FORM ────────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let data = await response.json();
        if (response.status == 200) {
            form.reset();
            result.classList.add('visible');
            setTimeout(() => {
                result.classList.remove('visible');
            }, 5000);
        } else {
            console.log(response);
            alert(data.message || "Something went wrong!");
        }
    })
    .catch(error => {
        console.log(error);
        alert("Something went wrong! Please try again later.");
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
  });
})();

// ─── AI CHATBOT ──────────────────────────────────────────────
(function initChatbot() {
  const launcher = document.getElementById('chatLauncher');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const quickReplies = document.getElementById('chatQuickReplies');
  const tooltip = document.getElementById('chatTooltip');
  if (!launcher) return;

  let isOpen = false;

  // Tooltip after 5s
  setTimeout(() => {
    tooltip.classList.add('visible');
    setTimeout(() => tooltip.classList.remove('visible'), 3000);
  }, 5000);

  // Bounce attention every 10s
  setInterval(() => {
    if (!isOpen) {
      launcher.style.animation = 'none';
      launcher.offsetHeight; // reflow
      launcher.style.animation = 'launcherBounce 0.5s ease, launcherPulse 2s ease-in-out infinite 0.5s';
    }
  }, 10000);

  function openChat() {
    isOpen = true;
    panel.classList.add('open');
    tooltip.classList.remove('visible');
    if (messages.children.length === 0) {
      playOpeningMessages();
    }
  }

  function closeChat() {
    isOpen = false;
    panel.classList.remove('open');
  }

  launcher.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn?.addEventListener('click', closeChat);

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `msg msg-${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  function showTyping() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messages.appendChild(indicator);
    messages.scrollTop = messages.scrollHeight;
    return indicator;
  }

  async function playOpeningMessages() {
    const msgs = [
      "Hey! 👋 Welcome to Vayra Digital Agency.",
      "We help local businesses get online and actually grow — websites, Google Maps, social media, AI tools, the whole deal.",
      "What's on your mind? Ask me anything 😊"
    ];
    const delays = [0, 1800, 3200];
    for (let i = 0; i < msgs.length; i++) {
      await new Promise(r => setTimeout(r, delays[i]));
      const typing = showTyping();
      await new Promise(r => setTimeout(r, 900));
      typing.remove();
      addMessage(msgs[i], 'bot');
    }
    quickReplies.style.display = 'flex';
  }

  async function sendBotReply(text) {
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 1200));
    typing.remove();
    addMessage(text, 'bot');
  }

  // ─── SMART OFFLINE CHATBOT ENGINE (No API needed) ───────────
  let userName = null;
  let askedName = false;
  let conversationCount = 0;

  // Randomize responses so it never feels repetitive
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // Detect keywords in user message
  function matches(msg, keywords) {
    const lower = msg.toLowerCase();
    return keywords.some(k => lower.includes(k));
  }

  function getSmartReply(userMsg) {
    const msg = userMsg.toLowerCase().trim();
    conversationCount++;

    // ─── NAME DETECTION ───
    if (askedName && !userName && msg.length < 30 && !msg.includes('?') && !matches(msg, ['price','cost','website','service','help','what','how','tell','time','long','deliver'])) {
      const rawName = userMsg.trim().replace(/^(i'm|i am|my name is|it's|its|call me|hey i'm)\s*/i, '').trim();
      const name = rawName.split(' ')[0];
      if (name.length >= 2) {
        userName = name.charAt(0).toUpperCase() + name.slice(1);
        return pick([
          `Nice to meet you, ${userName}! 😊 So what kind of business do you run? I'll tell you exactly how we can help.`,
          `Hey ${userName}! Good to have you here 👋 Tell me about your business — what do you do and where are you based?`,
          `Got it, ${userName}! 👍 What's your business about? I wanna suggest the right stuff for you.`
        ]);
      }
    }

    // ─── ASK FOR NAME (first time) ───
    if (!userName && !askedName) {
      askedName = true;
      if (matches(msg, ['hi','hello','hey','sup','yo','hii','hiii','start','helo'])) {
        return "Hey there! 👋 Great to have you. Before we dive in — what's your name?";
      }
      askedName = false;
    }

    const n = userName ? pick([`${userName}, `, `So ${userName}, `, '']) : '';

    // ─── PRICING / COST ───
    if (matches(msg, ['price','pricing','cost','how much','charges','rate','budget','package','affordable','expensive','cheap','fee','fees','money','pay','payment','rupee','inr','₹','kitna','kharcha','paisa'])) {
      return pick([
        `${n}honestly, I totally get wanting to know the cost upfront — but here's the thing, every business is different.\n\nA gym website is very different from a restaurant's full digital setup, right? So we always customize the plan and pricing based on what YOU actually need.\n\nThe best way? Just fill the contact form below or email us at vayraagency@outlook.com — our team will get back with a proper quote within 24 hours. No spam, promise 🤝`,
        `${n}good question! We don't believe in one-size-fits-all pricing because that never works well for anyone.\n\nWhat we do instead — hop on a quick free call, understand your business, and then give you a custom quote that actually makes sense for your budget.\n\nJust scroll down and fill the form, or drop a mail at vayraagency@outlook.com. We reply fast! 📩`,
        `${n}I wish I could give you a number right here, but it really depends on what services you need — website only? Full digital package? Social media?\n\nTell you what — book a free consultation (takes 2 minutes to fill the form below) and our team will send you a detailed quote within 24 hours. Zero obligation 🙌`
      ]);
    }

    // ─── DELIVERY TIME ───
    if (matches(msg, ['how long','time','delivery','deliver','days','weeks','duration','deadline','timeline','when will','kab tak','kitna time','fast','quick','urgent','jaldi'])) {
      return pick([
        `${n}great question! Here's a rough idea:\n\n🌐 Website — 5 to 7 working days for a complete, polished site\n📍 Google Maps setup — 2 to 3 days to get you listed and optimized\n📱 Social media — we start posting within 3-4 days of onboarding\n🤖 AI automation — 5 to 7 days depending on complexity\n\nOf course, if you need something urgent, we can work with tighter timelines too. Just let us know your situation 💪`,
        `${n}we move fast! Typical timelines:\n\n• Full website: 5-7 working days\n• Google Maps optimization: 2-3 days\n• Social media kickoff: 3-4 days\n• AI chatbot/automation: about a week\n\nWe don't drag projects for months like some agencies do. Once we start, we deliver on time — period ⚡\n\nWhat are you looking to get done?`,
        `${n}depends on the service, but we're pretty quick:\n\nWebsites take about 5-7 days from start to finish. Google Maps can be done in 2-3 days. Social media management starts within the first week.\n\nWe know time matters when you're running a business, so we don't waste it. Need something done ASAP? Let's talk — fill the form below 🚀`
      ]);
    }

    // ─── WEBSITE DEVELOPMENT (detailed) ───
    if (matches(msg, ['website','web site','web development','web design','landing page','site','webpage','online store','ecommerce'])) {
      return pick([
        `${n}websites are our bread and butter! Here's what you get:\n\n✅ Custom design — not a template, actually designed for YOUR brand\n✅ Mobile responsive — looks perfect on phones, tablets, everything\n✅ Fast loading — under 3 seconds, because slow sites lose customers\n✅ SEO optimized — so Google actually shows your site to people\n✅ Contact forms & WhatsApp integration\n✅ Delivered in 5-7 working days\n\nThink of your website as a 24/7 salesperson that never takes a day off 🔥\n\nWhat kind of business is this for?`,
        `${n}so here's the deal with websites — most businesses either don't have one, or have one that looks like it was made in 2010.\n\nWe build modern, clean, fast websites that actually make people trust your business and reach out to you.\n\nEverything included — design, development, mobile optimization, SEO, contact forms. Done in 5-7 days.\n\nAre you starting fresh or do you have an existing site that needs a revamp?`,
        `${n}a website isn't just a "nice to have" anymore — it's literally the first thing people check before they buy from you.\n\nWe build websites that:\n• Look premium and professional\n• Load fast on any device\n• Show up on Google searches\n• Have contact/inquiry forms built in\n• Are delivered in just 5-7 days\n\nWhat's your business? I'll tell you exactly how a website would help you grow 💡`
      ]);
    }

    // ─── GOOGLE MAPS / LOCAL SEO (detailed) ───
    if (matches(msg, ['google map','google maps','gmb','google my business','google business','local seo','maps','location','listing','near me','search'])) {
      return pick([
        `${n}Google Maps is probably the most underrated growth tool for local businesses. Here's why:\n\nWhen someone types "gym near me" or "best salon in [city]" — if you're not showing up, that customer goes to your competitor. Simple as that.\n\nWhat we do:\n📍 Set up or optimize your Google Business Profile\n⭐ Help you get more reviews (this is huge for ranking)\n📸 Add professional photos and posts\n📊 Track how many people find you each month\n\nSetup takes just 2-3 days. And the results? You'll start seeing more calls and walk-ins within weeks.\n\nDo you already have a Google listing, or starting fresh?`,
        `${n}let me put it this way — 90% of people Google a business before visiting it. If your business doesn't show up on Maps, you're basically invisible to all those potential customers.\n\nWe handle the full Google Maps setup:\n✅ Profile creation and verification\n✅ Business description, categories, hours\n✅ Photos and regular posts\n✅ Review generation strategy\n✅ Local SEO so you rank higher than competitors\n\nAll done in 2-3 days. This single service has literally doubled footfall for some of our clients 📈\n\nWhat type of business do you run?`
      ]);
    }

    // ─── SOCIAL MEDIA (detailed) ───
    if (matches(msg, ['social media','instagram','facebook','insta','fb','social','reels','content','posting','followers','linkedin','youtube','post','posts'])) {
      return pick([
        `${n}social media done right can transform your business. Here's what we handle:\n\n📱 Content creation — professional graphics, reels, stories\n📅 Consistent posting — we plan and post regularly so your page stays active\n💬 Engagement — responding to comments, building community\n📊 Growth strategy — targeted content that attracts YOUR customers\n\nWe cover Instagram, Facebook, LinkedIn — wherever your audience is.\n\nThe best part? You don't have to think about it. We handle everything while you run your business.\n\nAre you active on social media right now, or starting from scratch?`,
        `${n}most businesses post once in a while and wonder why they're not growing on social media. The secret? Consistency and quality.\n\nWe take over your social media completely:\n• Design branded posts and reels\n• Write engaging captions\n• Post on schedule (3-5x per week)\n• Handle comments and DMs\n• Monthly performance reports\n\nWe start within 3-4 days of onboarding. Your brand will look like a premium business online within the first month 🔥\n\nWhich platforms are you most interested in?`
      ]);
    }

    // ─── AI / AUTOMATION (detailed) ───
    if (matches(msg, ['ai','automation','artificial intelligence','chatbot','automate','bot','automated','whatsapp bot','auto reply','auto-reply'])) {
      return pick([
        `${n}AI automation is where things get really exciting. Here's what we can build for you:\n\n🤖 Smart chatbots — answer customer questions 24/7 (like this one!)\n📋 Auto lead capture — collect customer info automatically\n📅 Appointment booking systems\n📲 WhatsApp auto-replies\n📧 Automated follow-up emails\n\nBasically, your business keeps working even when you're sleeping or on a break.\n\nSetup usually takes 5-7 days depending on what you need.\n\nWhat's the one thing in your business you wish was automated?`,
        `${n}imagine this — a customer messages you at 2 AM asking about your services. Instead of losing that lead, your AI system responds instantly, captures their details, and you follow up in the morning.\n\nThat's what we build:\n• Smart chatbots for your website & WhatsApp\n• Automated inquiry forms\n• Booking and appointment systems\n• Follow-up sequences\n\nReady in about 5-7 days. It's like hiring a team that works 24/7 but costs a fraction.\n\nWhat does your business do? I'll tell you exactly what we can automate 💡`
      ]);
    }

    // ─── BRAND IDENTITY / DESIGN ───
    if (matches(msg, ['brand','branding','logo','identity','design','visual','colors','colour'])) {
      return pick([
        `${n}branding is everything! We build complete digital brand identities:\n\n🎨 Logo design\n🎯 Color palette and typography\n📐 Social media templates\n📄 Brand guidelines document\n\nWhen your brand looks consistent and professional across everything — website, social media, Google — people trust you more. And trust = more customers.\n\nDo you already have a logo, or are you building from scratch?`,
        `${n}your brand is the first impression people get. We make sure it's a great one.\n\nWe create logos, choose the right colors and fonts, design social media templates — everything that makes your business look premium and trustworthy.\n\nHave you already started on your branding, or is this new territory? 🎨`
      ]);
    }

    // ─── ANALYTICS / PERFORMANCE ───
    if (matches(msg, ['analytics','tracking','performance','data','report','monitor','growth','results','roi','return'])) {
      return pick([
        `${n}we don't just build and leave — we track everything:\n\n📊 Website traffic and visitor behavior\n📈 Google Maps views and calls\n📱 Social media engagement and growth\n🎯 Lead generation numbers\n\nYou get monthly reports so you can actually SEE your business growing online. No guesswork.\n\nWant to know how we'd track growth for your specific business?`,
        `${n}numbers don't lie! We set up proper analytics so you can see exactly what's working:\n\n• How many people visit your website\n• How many find you on Google Maps\n• Social media engagement rates\n• How many leads/inquiries you're getting\n\nWe send you easy-to-understand monthly reports. Real data, not fluff 📊\n\nWhat's your business? I'll tell you what metrics matter most for you.`
      ]);
    }

    // ─── SERVICES GENERAL ───
    if (matches(msg, ['service','services','what do you','what you do','what can you','offerings','offer','help me','kya karte'])) {
      return pick([
        `${n}we help local businesses go digital and actually grow. Here's the full menu:\n\n🌐 Website Development — custom sites, delivered in 5-7 days\n📍 Google Maps & Local SEO — get found locally in 2-3 days\n📱 Social Media Management — content, posting, growth\n🤖 AI Automation — chatbots, auto-replies, lead capture\n🎨 Brand Identity — logo, colors, complete visual system\n📊 Analytics & Reporting — track your growth monthly\n\nMost clients start with a website + Google Maps combo — that alone brings in a ton of new customers.\n\nWhat sounds most useful for your business?`,
        `${n}we basically take your offline business and build its entire online presence:\n\n1️⃣ Professional website (5-7 days)\n2️⃣ Google Maps visibility (2-3 days)\n3️⃣ Social media management (ongoing)\n4️⃣ AI automation tools (5-7 days)\n5️⃣ Brand design & identity\n6️⃣ Monthly performance tracking\n\nYou can pick individual services or go for a full package — whatever fits your goals and budget.\n\nWhat's your biggest pain point right now? Let me point you to the right service 🎯`
      ]);
    }

    // ─── ABOUT VAYRA ───
    if (matches(msg, ['about vayra','who are you','about you','about your company','tell me about','your agency','your team','vayra','where are you','based'])) {
      return pick([
        `${n}we're Vayra Digital Agency, based in Noida, India 🇮🇳\n\nThe name "Vayra" means power and movement — and that's exactly what we do. We move businesses from offline to online, from invisible to visible.\n\nWe've worked with gyms, salons, restaurants, clinics, coaching centers, and retail stores — helping them get websites, Google presence, social media, and automation set up.\n\nOur whole thing is: we make digital simple for business owners who don't have time to figure it out themselves.\n\nWhat about you — what's your business?`,
        `${n}Vayra is a digital growth agency from Noida that helps local businesses build their online presence from scratch.\n\nWe're not a huge corporate agency — we work closely with each client, understand their business, and deliver results fast (most projects done in under a week).\n\nOur focus areas: websites, Google Maps, social media, and AI automation.\n\nWhat industry are you in? I'd love to tell you how we can help 😊`
      ]);
    }

    // ─── HOW IT WORKS / PROCESS ───
    if (matches(msg, ['how does it work','process','steps','how do you work','what happens','how to start','get started','start working','kaise kaam'])) {
      return pick([
        `${n}super simple process! Here's how it works:\n\n1️⃣ Discovery Call — free 30-min chat to understand your business and goals\n2️⃣ Custom Plan — we create a strategy tailored to YOUR needs\n3️⃣ Build & Launch — we design, develop, and go live (5-7 days)\n4️⃣ Monitor & Grow — monthly tracking and optimization\n\nNo complicated contracts, no confusing tech talk. We keep it real and simple.\n\nReady to start? Just fill the contact form below and we'll set up that first call 🚀`,
        `${n}it's really straightforward:\n\nStep 1: You fill the contact form or email us\nStep 2: We hop on a free 30-min call to understand your business\nStep 3: We send you a custom plan with clear deliverables\nStep 4: Once approved, we start building — most things are done in 5-7 days\nStep 5: We hand over everything + provide ongoing support\n\nThe whole thing starts with one conversation. No commitments until you're 100% comfortable 👊`
      ]);
    }

    // ─── CONTACT / CONSULTATION ───
    if (matches(msg, ['contact','call','consult','consultation','book','appointment','schedule','reach','meeting','talk to','speak','connect','email','mail','phone','number'])) {
      return pick([
        `${n}absolutely! Here are all the ways to reach us:\n\n📧 Email: vayraagency@outlook.com\n📱 WhatsApp: check the link on this page\n📝 Contact form: scroll down on this page\n\nOr just fill the form right now — takes 30 seconds. Our team will get back to you within 24 hours and set up a free consultation call.\n\nNo pressure, no hard sell. Just a genuine conversation about your business 🙌`,
        `${n}let's connect! Easiest way:\n\n1. Scroll down and fill the contact form (takes 30 seconds)\n2. Or email us directly at vayraagency@outlook.com\n\nWe'll set up a free 30-minute call where we understand your goals and suggest the best approach. If it's a fit, great. If not, no hard feelings.\n\nLooking forward to chatting with you! 📞`
      ]);
    }

    // ─── GREETINGS ───
    if (matches(msg, ['hi','hello','hey','hii','hiii','good morning','good evening','good afternoon','sup','yo'])) {
      if (!userName) {
        askedName = true;
        return pick([
          "Hey there! 👋 Welcome to Vayra. What's your name? I like to keep things personal 😊",
          "Hi! Great to have you here 🙌 What should I call you?",
          "Hey! 👋 Before we chat — what's your name?"
        ]);
      }
      return pick([
        `Hey ${userName}! 👋 What can I help you with?`,
        `Hi ${userName}! What's on your mind today?`,
        `Hey ${userName}! 😊 Ask me anything about our services.`
      ]);
    }

    // ─── THANKS ───
    if (matches(msg, ['thank','thanks','thanku','thank you','thx','appreciate','shukriya','dhanyavaad'])) {
      return pick([
        `${n}you're welcome! 😊 Got more questions? I'm right here.`,
        `${n}anytime! Happy to help 👍 If you're ready to move forward, just fill the contact form below.`,
        `${n}glad I could help! Whenever you're ready to start, you know where to find us 🙌`
      ]);
    }

    // ─── BYE ───
    if (matches(msg, ['bye','goodbye','see you','later','gtg','gotta go'])) {
      return pick([
        `${n}take care! Talk soon 👋 When you're ready, just fill the form and we'll connect.`,
        `${n}bye! It was great chatting. You know where to find us 😊`,
        `${n}catch you later! Remember — Vayra's got your back whenever you're ready 🚀`
      ]);
    }

    // ─── BUSINESS TYPE ───
    if (matches(msg, ['gym','salon','restaurant','cafe','shop','store','retail','clinic','doctor','dentist','hotel','coaching','institute','school','bakery','boutique','fitness','spa','parlour','parlor','medical','hospital','pharmacy','jewellery','jewelry','real estate'])) {
      const biz = msg.match(/(gym|salon|restaurant|cafe|shop|store|retail|clinic|doctor|dentist|hotel|coaching|institute|school|bakery|boutique|fitness|spa|parlour|parlor|medical|hospital|pharmacy|jewellery|jewelry|real estate)/i)?.[0] || 'that';
      return pick([
        `${n}nice, a ${biz}! We've worked with similar businesses and here's what works best:\n\n🌐 A clean, professional website (5-7 days) — so people can find you online and see what you offer\n📍 Google Maps setup (2-3 days) — so when people search "${biz} near me" you show up first\n📱 Social media presence — build trust and attract followers\n\nThis combo alone has helped businesses like yours double their walk-ins within a month.\n\nWant to know more about any of these? Or should I connect you with our team for a detailed plan?`,
        `${n}a ${biz} — great! There's massive potential to grow a ${biz} digitally.\n\nMost ${biz} owners we've worked with didn't have any online presence before. Once we set up their website + Google Maps + social media, they started getting new customers they never would have reached before.\n\nAnd the best part? Everything can be up and running within a week.\n\nWhat's your main goal — more customers, better brand image, or both? 🎯`
      ]);
    }

    // ─── YES / INTERESTED ───
    if (matches(msg, ['yes','yeah','yep','sure','okay','ok','interested','tell me more','go ahead','definitely','absolutely','haan','ji'])) {
      return pick([
        `${n}awesome! 🙌 So which of these would help your business most?\n\n🌐 Professional website\n📍 Google Maps visibility\n📱 Social media management\n🤖 AI automation\n\nOr if you want the full package, we can do that too! Just tell me what matters most to you right now.`,
        `${n}love the energy! 🔥 What's your biggest challenge right now?\n\n• Not enough customers finding you?\n• No online presence at all?\n• Want to look more professional online?\n• Need to automate repetitive tasks?\n\nTell me and I'll suggest exactly what to start with.`
      ]);
    }

    // ─── NO / NOT NOW ───
    if (matches(msg, ['no','nope','not interested','not now','later','not sure','maybe','sochta hu','baad me'])) {
      return pick([
        `${n}no worries at all! 😊 Take your time. When you're ready, we're just a message away.`,
        `${n}totally fine! No rush. Whenever you feel like exploring, you know where to find us 👋`,
        `${n}all good! Just remember — when you're ready to take your business online, Vayra's here for you 🚀`
      ]);
    }

    // ─── WHY VAYRA / WHY CHOOSE YOU ───
    if (matches(msg, ['why vayra','why you','why should i','what makes you different','why choose','better than','competitor'])) {
      return pick([
        `${n}fair question! Here's why businesses choose us:\n\n⚡ Fast delivery — most projects done in 5-7 days, not months\n🎯 Custom everything — no cookie-cutter templates\n💰 Business-friendly pricing — we work with your budget\n🤝 Personal attention — you talk to real humans, not support tickets\n📊 Results focused — we track growth, not just deliver files\n\nWe're not a massive agency that treats you like a number. We actually care about your business growing.\n\nWant to see how we'd approach YOUR business specifically?`
      ]);
    }

    // ─── SUPPORT / AFTER DELIVERY ───
    if (matches(msg, ['support','after','maintain','maintenance','update','updates','change','changes','issue','problem','help after','post delivery'])) {
      return pick([
        `${n}we don't just deliver and disappear! After your project is live:\n\n✅ We provide support for any issues or questions\n✅ Small changes and updates? We handle them\n✅ Monthly management available for social media and SEO\n✅ Performance reports so you know what's working\n\nThink of us as your long-term digital partner, not a one-time vendor 🤝\n\nAnything specific you're worried about?`
      ]);
    }

    // ─── DEFAULT FALLBACK ───
    if (!userName) {
      askedName = true;
      return "Hey! I'd love to help you out 😊 But first — what's your name?";
    }

    return pick([
      `${n}hmm, interesting! Tell me more about what you need — website, social media, Google Maps, automation? I'll give you the full picture 👀`,
      `${n}I want to help you in the best way possible! What's your main goal — getting more customers online, building your brand, or automating your business?`,
      `${n}not sure I got that clearly. Could you tell me a bit about your business? That'll help me suggest exactly the right services 🎯`,
      `${n}I'm here to help! Try asking me about:\n\n• Our services\n• Delivery timelines\n• How we work\n• What's best for your business type\n\nOr just fill the contact form below to talk to our team directly 😊`
    ]);
  }


  // ─── MAIN SEND FUNCTION ───
  async function sendGeminiMessage(userMsg) {
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 800 + Math.random() * 800)); // Human-like delay
    typing.remove();
    const reply = getSmartReply(userMsg);
    addMessage(reply, 'bot');
  }

  // Quick replies
  quickReplies?.querySelectorAll('.quick-reply').forEach(btn => {
    btn.addEventListener('click', async () => {
      const label = btn.textContent;
      // Add the user message directly to the chat
      quickReplies.style.display = 'none';
      // Forward the text to the Gemini AI so it responds naturally!
      await sendGeminiMessage(label);
    });
  });

  // Input send
  async function handleSend() {
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addMessage(msg, 'user');
    quickReplies.style.display = 'none';
    await sendGeminiMessage(msg);
  }

  sendBtn?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
})();

// ─── LAUNCHER BOUNCE KEYFRAME (add dynamically) ───────────────
(function addLauncherBounce() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes launcherBounce {
      0%, 100% { transform: translateY(0); }
      20% { transform: translateY(-8px); }
      40% { transform: translateY(-4px); }
      60% { transform: translateY(-6px); }
      80% { transform: translateY(-2px); }
    }
  `;
  document.head.appendChild(style);
})();

// ─── SMOOTH SCROLL FOR ANCHORS ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
