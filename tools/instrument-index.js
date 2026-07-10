const CATEGORIES = {
  foundation: {label:"Cross-Channel Foundation", short:"Foundation"},
  sem:        {label:"Paid Search / SEM, Google Ads", short:"Google Ads / SEM"},
  meta:       {label:"Paid Social, Meta Ads", short:"Meta Ads"},
  ga4:        {label:"Web Analytics, GA4", short:"GA4"},
  gtm:        {label:"Tagging Infrastructure, GTM", short:"GTM"},
  social:     {label:"Organic Social", short:"Organic Social"},
  seo:        {label:"SEO / Organic Search", short:"SEO"},
  gbp:        {label:"Local, Google Business Profile", short:"GBP / Local"},
  email:      {label:"Email Marketing", short:"Email"},
  sms:        {label:"SMS Marketing", short:"SMS"}
};

const TAGS = {
  awareness:"Awareness", consideration:"Consideration", conversion:"Conversion",
  retention:"Retention", ecommerce:"Ecommerce", b2b:"B2B / SaaS",
  local:"Local / Service", leadgen:"Lead Gen", brand:"Brand",
  efficiency:"Budget Efficiency", content:"Content / SEO", dataquality:"Data Quality"
};

const KPIS = [
{cat:"foundation", acr:"CAC", name:"Customer Acquisition Cost", def:"Total sales & marketing spend divided by the number of new customers acquired in a period.", ex:"$50,000 spend ÷ 250 new customers = $200 CAC", best:"Evaluating overall marketing efficiency and comparing channel profitability. Central to profitable-growth mandates in SaaS and ecommerce; less useful alone in awareness-only phases.", tags:["efficiency","ecommerce","b2b"]},
{cat:"foundation", acr:"LTV / CLV", name:"Customer Lifetime Value", def:"Predicted net revenue or profit a customer generates over the full relationship with the business.", ex:"$80 AOV × 4 orders/yr × 3-yr retention = $960 LTV", best:"Setting acceptable CAC ceilings and target LTV:CAC ratios. Essential wherever repeat purchase exists (subscription, DTC, retail); less central for single-purchase categories like real estate.", tags:["retention","ecommerce","b2b"]},
{cat:"foundation", acr:"LTV:CAC", name:"LTV-to-CAC Ratio", def:"LTV divided by CAC, the return generated per dollar spent acquiring a customer.", ex:"$960 LTV ÷ $200 CAC = 4.8:1", best:"Board and investor reporting, and budget allocation across channels. A ratio below 3:1 usually signals unsustainable acquisition spend; below 1:1 means losing money per customer.", tags:["efficiency","b2b","ecommerce"]},
{cat:"foundation", acr:"ROAS", name:"Return on Ad Spend", def:"Revenue generated per dollar of ad spend, across all paid channels combined.", ex:"$12,000 revenue ÷ $3,000 spend = 4.0 ROAS", best:"Direct-response and ecommerce campaigns where revenue is trackable per click. Less meaningful for brand-awareness or long B2B sales cycles where revenue lags by months.", tags:["ecommerce","efficiency","conversion"]},
{cat:"foundation", acr:"MER", name:"Marketing Efficiency Ratio", def:"Total revenue divided by total marketing spend across all channels, the blended, platform-agnostic version of ROAS.", ex:"$200,000 total revenue ÷ $40,000 total spend = 5.0 MER", best:"Multi-channel ecommerce brands where individual platform-reported ROAS is inflated by overlapping attribution claims. Use as the business-level 'north star' efficiency number.", tags:["ecommerce","efficiency"]},
{cat:"foundation", acr:"ROI", name:"Marketing Return on Investment", def:"(Revenue attributable to marketing − marketing cost) ÷ marketing cost, expressed as a percentage.", ex:"($150,000 − $50,000) ÷ $50,000 = 200% ROI", best:"Justifying budget to finance and leadership. Requires reliable revenue attribution, so it pairs best with CRM-connected reporting in B2B or high-ticket industries.", tags:["b2b","efficiency"]},
{cat:"foundation", acr:"Payback Period", name:"CAC Payback Period", def:"Number of months needed for a customer's gross margin to repay the cost of acquiring them.", ex:"$200 CAC ÷ $40 monthly gross margin = 5-month payback", best:"SaaS and subscription businesses managing cash flow, runway, and fundraising narratives. Critical before deciding to increase paid spend aggressively.", tags:["b2b","efficiency","retention"]},
{cat:"foundation", acr:"MQL→SQL", name:"MQL-to-SQL Conversion Rate", def:"Percentage of Marketing Qualified Leads that convert to Sales Qualified Leads.", ex:"400 MQLs → 80 SQLs = 20% conversion", best:"B2B demand-gen programs aligning marketing and sales. A drop here flags a lead-quality problem distinct from a lead-volume problem.", tags:["b2b","leadgen","conversion"]},
{cat:"foundation", acr:"Pipeline Velocity", name:"Pipeline Value & Velocity", def:"Total dollar value of marketing-sourced or -influenced opportunities, and the speed they move through funnel stages.", ex:"$1.2M marketing-sourced pipeline this quarter, 45-day avg stage velocity", best:"Long B2B sales cycles where revenue lags campaign activity by months. Ties marketing activity to sales outcomes for leadership review.", tags:["b2b","leadgen"]},

{cat:"sem", acr:"CTR", name:"Click-Through Rate (Search)", def:"Clicks divided by impressions on a search ad.", ex:"450 clicks ÷ 15,000 impressions = 3.0% CTR", best:"Diagnosing ad relevance and headline performance early, a leading indicator available before conversion volume is statistically significant.", tags:["awareness","efficiency"]},
{cat:"sem", acr:"CPC", name:"Cost Per Click", def:"Average amount paid per click on a search ad.", ex:"$3,000 spend ÷ 1,000 clicks = $3.00 CPC", best:"Managing bid strategy in high-CPC verticals (legal, insurance, finance) and forecasting traffic-volume budgets.", tags:["efficiency"]},
{cat:"sem", acr:"CPA", name:"Cost Per Acquisition", def:"Ad spend divided by number of conversions.", ex:"$5,000 spend ÷ 100 leads = $50 CPA", best:"Lead-gen and ecommerce campaigns with a defined conversion action, the default bid-optimization target for Target CPA strategies.", tags:["leadgen","ecommerce","conversion"]},
{cat:"sem", acr:"CVR", name:"Conversion Rate (Search)", def:"Conversions divided by clicks.", ex:"100 conversions ÷ 1,000 clicks = 10% CVR", best:"Isolating landing-page and offer performance from targeting performance. Read alongside CTR to separate a 'clicks' problem from a 'converting' problem.", tags:["conversion","efficiency"]},
{cat:"sem", acr:"QS", name:"Quality Score", def:"Google's 1–10 diagnostic of ad relevance, expected CTR, and landing-page experience.", ex:"Quality Score 7/10 on a core keyword", best:"Diagnosing high CPCs or weak ad visibility in mature, keyword-based Search campaigns. Not exposed in Performance Max.", tags:["efficiency"]},
{cat:"sem", acr:"Search IS", name:"Search Impression Share", def:"Impressions received divided by total eligible impressions available to the campaign.", ex:"62% impression share (38% lost to budget/rank)", best:"Diagnosing whether growth is capped by budget or by ad rank, essential when scaling spend in a category with headroom, or defending branded terms.", tags:["efficiency","brand"]},
{cat:"sem", acr:"Abs. Top IS", name:"Search Absolute Top Impression Share", def:"Percentage of impressions shown in the very first ad position on the page.", ex:"40% Absolute Top Impression Share", best:"Brand-defense campaigns and high-intent commercial keywords, where the top position carries disproportionate CTR.", tags:["brand","conversion"]},
{cat:"sem", acr:"ROAS", name:"Return on Ad Spend (Shopping/PMax)", def:"Revenue per dollar spent within Google Ads, typically via Shopping or Performance Max.", ex:"$8 revenue per $1 spent = 800% ROAS", best:"Ecommerce campaigns with purchase-value tracking, the primary target for Target ROAS bidding strategies.", tags:["ecommerce","efficiency"]},
{cat:"sem", acr:"CPM", name:"Cost Per Mille (Display/YouTube)", def:"Cost per 1,000 impressions.", ex:"$12,000 spend ÷ 2,000,000 impressions = $6.00 CPM", best:"Upper-funnel reach campaigns (Display, YouTube, Demand Gen) where awareness, not clicks, is the goal.", tags:["awareness","brand"]},

{cat:"meta", acr:"CPM", name:"Cost Per Mille (Meta)", def:"Cost per 1,000 impressions on Facebook or Instagram.", ex:"$4.50 CPM", best:"Awareness and reach objectives, and as an early signal of audience saturation or rising auction pressure.", tags:["awareness","efficiency"]},
{cat:"meta", acr:"CPC (Link)", name:"Cost Per Link Click", def:"Cost per click to an external destination, distinct from 'all clicks' which includes likes and comments.", ex:"$0.85 CPC (link clicks only)", best:"Traffic campaigns driving to a landing or product page. Always read 'link click,' not 'all clicks,' to avoid vanity inflation.", tags:["conversion","efficiency"]},
{cat:"meta", acr:"CTR (Link)", name:"Link Click-Through Rate", def:"Link clicks divided by impressions.", ex:"1.2% link CTR", best:"Creative testing, the fastest available signal of whether a hook or concept resonates, before conversion volume is meaningful.", tags:["awareness","efficiency"]},
{cat:"meta", acr:"Frequency", name:"Frequency", def:"Average number of times a unique user has seen the ad within the reporting window.", ex:"Frequency of 3.4 over 30 days", best:"Retargeting and always-on campaigns, to catch ad fatigue and creative burnout before CPMs and CPAs start climbing.", tags:["retention","efficiency"]},
{cat:"meta", acr:"CPR", name:"Cost Per Result", def:"Cost per the campaign's chosen optimization event, purchase, lead, install, etc.", ex:"$18 CPR on a Leads objective", best:"Comparing efficiency across campaigns that use different objectives on a like-for-like basis. The default headline metric in Ads Manager.", tags:["leadgen","efficiency","conversion"]},
{cat:"meta", acr:"Ad Rankings", name:"Quality / Engagement / Conversion Ranking", def:"Meta's three relative diagnostics comparing an ad to competitors targeting the same audience.", ex:"\"Below Average (bottom 35%)\" on Conversion Rate ranking", best:"Root-causing underperformance: creative quality vs. landing-page/offer fit vs. audience-conversion mismatch.", tags:["efficiency","conversion"]},
{cat:"meta", acr:"Hook Rate", name:"Hook Rate (3-Second Video Views)", def:"Percentage of viewers who watch at least 3 seconds of a video ad.", ex:"28% hook rate", best:"Video and Reels creative testing for scroll-stopping power, especially in crowded feeds (DTC, entertainment, apps).", tags:["awareness","conversion"]},
{cat:"meta", acr:"ROAS", name:"Return on Ad Spend (Meta)", def:"Purchase revenue per dollar of ad spend, per Meta's own attribution window.", ex:"3.5 ROAS", best:"Ecommerce and app-purchase campaigns. Always cross-check against blended MER, Meta's attribution tends to over-credit itself.", tags:["ecommerce","efficiency"]},

{cat:"ga4", acr:"Engaged Sessions", name:"Engaged Sessions", def:"Sessions lasting 10+ seconds, containing a key event, or with 2+ pageviews, GA4's engagement threshold.", ex:"8,400 engaged sessions of 12,000 total", best:"Assessing content and landing-page quality across any industry. GA4's replacement for the old 'non-bounce' concept.", tags:["content","conversion"]},
{cat:"ga4", acr:"Engagement Rate", name:"Engagement Rate", def:"Engaged sessions divided by total sessions.", ex:"70% engagement rate", best:"Comparing traffic-source or landing-page quality. A low rate on paid traffic flags a targeting or landing-page mismatch even when CTR looks healthy.", tags:["efficiency","content"]},
{cat:"ga4", acr:"Avg. Engagement Time", name:"Average Engagement Time", def:"Average time a session was actively in focus (not merely open) per active user.", ex:"1m 42s average engagement time", best:"Content, editorial, and product-detail pages where dwell time correlates with intent.", tags:["content","consideration"]},
{cat:"ga4", acr:"Key Events", name:"Key Events (Conversions)", def:"GA4's term for events explicitly marked as conversions, purchase, lead-form submit, sign-up, etc.", ex:"340 key events recorded from \"generate_lead\"", best:"Any goal-driven site. Only as reliable as the underlying event setup, so pair with GTM tag-health metrics below.", tags:["conversion","leadgen","dataquality"]},
{cat:"ga4", acr:"Sessions/User", name:"Sessions per User", def:"Average number of sessions per user within a period.", ex:"1.8 sessions per user", best:"Evaluating return-visit behavior for content, media, or high-consideration purchases like B2B and real estate.", tags:["b2b","content","consideration"]},
{cat:"ga4", acr:"DDA", name:"Data-Driven Attribution Credit", def:"GA4's default model, which algorithmically distributes conversion credit across touchpoints using observed conversion paths.", ex:"Paid Social 22% · Organic Search 48% · Direct 30% credit on one conversion", best:"Multi-touch, multi-channel campaigns where last-click attribution would understate upper-funnel channel value.", tags:["efficiency","brand"]},
{cat:"ga4", acr:"Revenue/User", name:"Purchase Revenue per User", def:"Total or per-user transactional revenue tracked via ecommerce events.", ex:"$14.20 revenue per active user", best:"Ecommerce, connects traffic data directly to business revenue, feeding MER and ROAS calculations upstream.", tags:["ecommerce","conversion"]},

{cat:"gtm", acr:"Fire Rate", name:"Tag Firing Success Rate", def:"Percentage of intended tag fires that execute without error, verified via preview/debug mode or a QA tool.", ex:"98.5% fire rate across production tags", best:"Post-launch QA after any container publish, and periodically wherever paid bidding algorithms depend on clean signal (Google, Meta both need it to optimize).", tags:["dataquality","efficiency"]},
{cat:"gtm", acr:"Data Layer Completeness", name:"Data Layer Completeness", def:"Percentage of required dataLayer variables present and correctly typed across page and event types.", ex:"92% of product-page views push a complete ecommerce object", best:"Ecommerce and lead-gen sites before scaling paid spend, incomplete data layers silently under-report conversions and mislead bid algorithms.", tags:["dataquality","ecommerce","leadgen"]},
{cat:"gtm", acr:"Publish Error Rate", name:"Container Publish Error Rate", def:"Frequency of GTM container versions published with tag or trigger misconfigurations that later require rollback.", ex:"1 rollback in the last 14 publishes", best:"Teams with multiple contributors editing GTM, justifies a formal QA and versioning workflow.", tags:["dataquality"]},
{cat:"gtm", acr:"Consent Coverage", name:"Consent Mode Coverage", def:"Percentage of sessions where consent state is correctly signaled before tags fire, for regions under GDPR/CCPA.", ex:"100% of EU sessions gated by Consent Mode v2", best:"Any business serving EU, UK, or California traffic, required for compliance and directly affects whether Google can model conversions for consent-denied users.", tags:["dataquality","b2b"]},
{cat:"gtm", acr:"Duplicate Rate", name:"Duplicate / Ghost Tracking Rate", def:"Percentage of events fired more than once per user action due to redundant tags.", ex:"6% duplicate purchase events inflating reported revenue", best:"Auditing after a platform migration (e.g., Universal Analytics → GA4) or an agency handoff, where legacy tags often linger unnoticed.", tags:["dataquality","ecommerce"]},

{cat:"social", acr:"Engagement Rate", name:"Engagement Rate (Organic)", def:"Likes, comments, shares, and saves divided by reach or follower count.", ex:"4.2% engagement rate on an Instagram post", best:"Brand-awareness and community goals, a more meaningful read on content resonance than raw follower count.", tags:["brand","awareness"]},
{cat:"social", acr:"Reach", name:"Reach", def:"Number of unique accounts that saw a post.", ex:"45,000 reach on a Reel", best:"Awareness campaigns and evaluating algorithmic distribution of content independent of follower base.", tags:["awareness","brand"]},
{cat:"social", acr:"Impressions", name:"Impressions", def:"Total number of times content displayed, including repeat views by the same account.", ex:"61,000 impressions vs. 45,000 reach (1.35 avg views/viewer)", best:"Comparing content frequency, e.g., Stories sequences or retargeting-style organic content.", tags:["awareness"]},
{cat:"social", acr:"Follower Growth", name:"Follower Growth Rate", def:"Net new followers divided by starting follower count over a period.", ex:"+1,200 net followers ÷ 30,000 starting = 4% monthly growth", best:"Early-stage brand building. De-prioritize once a channel matures and engagement or conversion matter more than audience size.", tags:["brand","awareness"]},
{cat:"social", acr:"SOV", name:"Share of Voice (Social)", def:"Brand's mentions or engagement volume as a percentage of total category conversation.", ex:"18% share of voice vs. the top 4 competitors", best:"Crowded, competitive categories (CPG, retail, media) where relative presence matters more than absolute volume.", tags:["brand","awareness"]},
{cat:"social", acr:"Completion Rate", name:"Video Completion / View-Through Rate", def:"Percentage of viewers who watch a video to completion or a set threshold (e.g., 75%).", ex:"34% completion rate on a 15-second Reel", best:"Storytelling and brand-narrative content, signals whether length and pacing match audience attention span.", tags:["brand","content"]},
{cat:"social", acr:"Amplification", name:"Amplification Rate", def:"Shares divided by total reach or followers.", ex:"0.8% amplification rate", best:"Evaluating word-of-mouth potential, most relevant for content explicitly designed to be shared (UGC, cause marketing, contests).", tags:["brand","awareness"]},

{cat:"seo", acr:"Organic Traffic", name:"Organic Traffic", def:"Sessions arriving via unpaid search engine results.", ex:"22,000 organic sessions per month", best:"The core top-of-funnel health metric for any content- or SEO-led business, media, SaaS blogs, ecommerce category pages.", tags:["content","efficiency"]},
{cat:"seo", acr:"Visibility", name:"Keyword Rankings / Visibility Score", def:"Tracked position for target keywords, often aggregated into a weighted visibility index across a keyword set.", ex:"Avg. position 4.2 across 150 tracked terms; visibility score 62/100", best:"Competitive categories where rank volatility from algorithm updates or new competitor content needs catching before traffic actually drops.", tags:["content","brand"]},
{cat:"seo", acr:"Organic CTR", name:"Organic CTR (SERP)", def:"Clicks divided by impressions in Search Console, by query or page.", ex:"3.8% CTR at position 4", best:"Diagnosing title-tag and meta-description effectiveness independent of ranking position, a page can rank well and still underperform.", tags:["content","efficiency"]},
{cat:"seo", acr:"DA / DR", name:"Domain Authority / Domain Rating", def:"Third-party composite score (Moz/Ahrefs) predicting ranking strength, driven largely by backlink profile.", ex:"Domain Rating 54", best:"Competitive benchmarking and prioritizing link-building investment. Directional only, not a Google metric, don't over-index day to day.", tags:["content","brand"]},
{cat:"seo", acr:"Ref. Domains", name:"Referring Domains / Backlinks", def:"Count of unique external domains, and total links, pointing to the site.", ex:"310 referring domains, up from 260 last quarter", best:"Authority-building phases for newer sites, and measuring digital PR campaign output.", tags:["content","brand"]},
{cat:"seo", acr:"Organic CVR", name:"Organic Conversion Rate", def:"Conversions from organic-search sessions divided by organic sessions.", ex:"2.1% organic conversion rate", best:"Proving SEO's revenue contribution to leadership, not just traffic volume, especially when justifying continued content investment.", tags:["content","efficiency","ecommerce"]},
{cat:"seo", acr:"CWV", name:"Core Web Vitals (LCP / INP / CLS)", def:"Google's page-experience metrics: Largest Contentful Paint (load speed), Interaction to Next Paint (responsiveness), Cumulative Layout Shift (visual stability).", ex:"LCP 2.1s · INP 180ms · CLS 0.05, all \"Good\"", best:"Technical SEO audits on any site, especially ecommerce and publisher sites, where Google has confirmed these as ranking and UX factors.", tags:["content","ecommerce","dataquality"]},
{cat:"seo", acr:"Index Coverage", name:"Index Coverage / Crawl Error Rate", def:"Percentage of submitted URLs successfully indexed vs. excluded or errored, per Search Console.", ex:"96% of 1,200 submitted URLs indexed; 4% \"crawled, not indexed\"", best:"Large sites, ecommerce catalogs, programmatic SEO, publishers, where crawl budget and indexation bugs can silently cap organic growth.", tags:["content","dataquality"]},

{cat:"gbp", acr:"GBP Views", name:"GBP Total Views (Search + Maps)", def:"Number of times the business profile was viewed on Google Search and Maps combined.", ex:"8,200 profile views per month", best:"Local service businesses and multi-location retail measuring visibility in local search before it converts to action.", tags:["local","awareness"]},
{cat:"gbp", acr:"Directions", name:"Direction Requests", def:"Number of users who tapped \"Directions\" from the profile.", ex:"340 direction requests per month", best:"Businesses reliant on foot traffic, restaurants, retail, healthcare clinics. A strong proxy for offline visit intent.", tags:["local","conversion"]},
{cat:"gbp", acr:"Call Clicks", name:"Call Clicks", def:"Number of phone calls initiated directly from the GBP listing.", ex:"210 call clicks per month", best:"Service businesses where the phone call is the primary conversion action, home services, legal, medical, rather than a web form.", tags:["local","leadgen"]},
{cat:"gbp", acr:"Website Clicks", name:"Website Clicks (from GBP)", def:"Number of clicks to the business website originating from the profile.", ex:"190 website clicks per month", best:"Businesses moving local searchers into a fuller funnel, booking flow, menu, portfolio, rather than converting on the profile itself.", tags:["local","conversion"]},
{cat:"gbp", acr:"Reviews", name:"Review Rating & Volume", def:"Average star rating and total count of Google reviews.", ex:"4.6★ across 312 reviews, +14 new this month", best:"Trust-sensitive local categories, healthcare, home services, hospitality, where rating directly influences Local Pack ranking and click-through.", tags:["local","brand"]},
{cat:"gbp", acr:"Local Pack Rank", name:"Local Pack (Map Pack) Ranking", def:"Position within Google's top-3 local results shown for a given search-plus-location query.", ex:"Ranks #2 in the Map Pack for \"emergency plumber [city]\"", best:"Any single- or multi-location local business competing on proximity, relevance, and prominence, the single highest-leverage local SEO metric to track by keyword and location.", tags:["local","conversion","efficiency"]},

{cat:"email", acr:"Open Rate", name:"Open Rate", def:"Percentage of delivered emails opened, tracked via pixel.", ex:"220 opens ÷ 1,000 delivered = 22% open rate", best:"Subject-line testing and send-time optimization, but read directionally, not literally: iOS 15+ Mail Privacy Protection auto-triggers opens for a large share of Apple Mail users, inflating the number.", tags:["awareness","content"]},
{cat:"email", acr:"CTR", name:"Click-Through Rate (Email)", def:"Clicks divided by delivered emails.", ex:"45 clicks ÷ 1,000 delivered = 4.5% CTR", best:"The core engagement metric for promotional and lifecycle sends, less distorted by privacy proxies than open rate, so more trustworthy for judging real interest.", tags:["conversion","efficiency"]},
{cat:"email", acr:"CTOR", name:"Click-to-Open Rate", def:"Clicks divided by opens, isolates content and CTA performance from subject-line/deliverability performance.", ex:"45 clicks ÷ 220 opens = 20.5% CTOR", best:"Creative and CTA testing within an already-opened cohort, the cleanest read on whether the body content itself is working.", tags:["content","conversion"]},
{cat:"email", acr:"CVR", name:"Conversion Rate (Email)", def:"Conversions divided by delivered (or clicked) emails.", ex:"18 purchases ÷ 1,000 delivered = 1.8% CVR", best:"Ecommerce and lead-gen email judged on revenue or pipeline outcome rather than engagement alone.", tags:["ecommerce","leadgen","conversion"]},
{cat:"email", acr:"RPE", name:"Revenue Per Email", def:"Revenue generated divided by emails sent or delivered.", ex:"$2,400 revenue ÷ 20,000 sent = $0.12 RPE", best:"Comparing campaign ROI across sends of different sizes, especially for ecommerce lifecycle flows like abandoned cart and post-purchase.", tags:["ecommerce","efficiency","retention"]},
{cat:"email", acr:"List Growth", name:"List Growth Rate", def:"Net new subscribers divided by total list size over a period.", ex:"+500 net new ÷ 20,000 existing = 2.5% monthly growth", best:"Early-stage owned-audience building. Always read alongside unsubscribe rate, growth without retention just churns the list faster.", tags:["awareness","brand"]},
{cat:"email", acr:"Unsub Rate", name:"Unsubscribe Rate", def:"Unsubscribes divided by delivered emails.", ex:"8 unsubscribes ÷ 1,000 delivered = 0.8%", best:"Diagnosing send-frequency fatigue or content-relevance mismatch, watch closely during win-back campaigns and immediately after any list migration.", tags:["retention","dataquality"]},
{cat:"email", acr:"Inbox Placement", name:"Deliverability / Inbox Placement Rate", def:"Percentage of sent emails that land in the inbox, not spam, across major providers.", ex:"94% inbox placement across a Gmail/Outlook/Yahoo seed-list panel", best:"Any list at scale. A silent upstream killer of every other metric if domain reputation degrades, check after a volume increase or a purchased/imported list.", tags:["dataquality","efficiency"]},
{cat:"email", acr:"Bounce Rate", name:"Bounce Rate (Hard / Soft)", def:"Percentage of sends that fail to deliver, hard (permanent, e.g. invalid address) vs. soft (temporary, e.g. mailbox full).", ex:"1.2% hard bounce, 0.6% soft bounce", best:"List hygiene audits. Hard bounce rates above roughly 2% put sender reputation at risk and should trigger a list-cleaning pass.", tags:["dataquality"]},

{cat:"sms", acr:"Opt-In Rate", name:"Opt-In Rate", def:"Percentage of eligible contacts, site visitors, checkout customers, who subscribe to SMS.", ex:"320 opt-ins ÷ 8,000 eligible sessions = 4% opt-in rate", best:"Early-phase SMS launch or testing new acquisition placements (checkout, popup, post-purchase), the metric that matters before the channel has volume to optimize anything else.", tags:["awareness","ecommerce"]},
{cat:"sms", acr:"Delivery Rate", name:"Delivery Rate", def:"Percentage of sent messages successfully delivered to carrier and handset.", ex:"98.2% delivery rate", best:"Infrastructure health check, a drop usually signals carrier filtering or a 10DLC registration/compliance issue, not a creative problem.", tags:["dataquality"]},
{cat:"sms", acr:"CTR", name:"Click-Through Rate (SMS)", def:"Link clicks divided by delivered messages.", ex:"120 clicks ÷ 5,000 delivered = 2.4% CTR", best:"Flash sales, time-sensitive promos, and abandoned-cart recovery, SMS CTR typically runs well above email CTR because of near-instant read behavior.", tags:["ecommerce","conversion"]},
{cat:"sms", acr:"CVR", name:"Conversion Rate (SMS)", def:"Conversions attributed to the SMS send divided by delivered messages.", ex:"40 purchases ÷ 5,000 delivered = 0.8% CVR", best:"Ecommerce flash-sale and cart-recovery flows, where SMS frequently outperforms email conversion rate due to immediacy.", tags:["ecommerce","conversion","retention"]},
{cat:"sms", acr:"RPM", name:"Revenue Per Message", def:"Revenue generated divided by messages sent.", ex:"$1,800 revenue ÷ 5,000 sent = $0.36 RPM", best:"Comparing SMS program ROI against email RPE, SMS costs meaningfully more per send, so this is what justifies the channel's spend.", tags:["ecommerce","efficiency"]},
{cat:"sms", acr:"Opt-Out Rate", name:"Opt-Out Rate", def:"STOP replies divided by delivered messages.", ex:"25 opt-outs ÷ 5,000 delivered = 0.5%", best:"Monitoring frequency fatigue on every single send, not just periodically, audience tolerance for over-messaging is much lower on SMS than email.", tags:["retention","dataquality"]},
{cat:"sms", acr:"Response Rate", name:"Response Rate (Conversational SMS)", def:"Percentage of recipients who reply to a two-way message, distinct from STOP replies.", ex:"6% reply rate on a \"Reply YES for early access\" send", best:"Conversational commerce, customer service SMS, and appointment-based local businesses using confirm/reschedule flows.", tags:["local","conversion","retention"]}
];

function buildChips(){
  const catGroup = document.getElementById('cat-group');
  Object.entries(CATEGORIES).forEach(([key,meta])=>{
    const b = document.createElement('button');
    b.className='chip'; b.dataset.cat=key; b.textContent=meta.short;
    b.style.setProperty('--cat-c', `var(--cat-${key})`);
    b.addEventListener('click',()=>{ b.classList.toggle('active'); render(); });
    catGroup.appendChild(b);
  });
  const tagGroup = document.getElementById('tag-group');
  Object.entries(TAGS).forEach(([key,label])=>{
    const b = document.createElement('button');
    b.className='chip tagchip'; b.dataset.tag=key; b.textContent=label;
    b.addEventListener('click',()=>{ b.classList.toggle('active'); render(); });
    tagGroup.appendChild(b);
  });
}

function activeSet(selector){
  return new Set(Array.from(document.querySelectorAll(selector+'.active')).map(el=>el.dataset.cat||el.dataset.tag));
}

function render(){
  const q = document.getElementById('search').value.trim().toLowerCase();
  const cats = activeSet('#cat-group .chip');
  const tags = activeSet('#tag-group .chip');

  const filtered = KPIS.filter(k=>{
    if (cats.size && !cats.has(k.cat)) return false;
    if (tags.size && !k.tags.some(t=>tags.has(t))) return false;
    if (q){
      const hay = (k.acr+' '+k.name+' '+k.def+' '+k.best).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  document.getElementById('count-badge').textContent = filtered.length+' of '+KPIS.length;
  document.getElementById('stat-shown').textContent = filtered.length;

  const results = document.getElementById('results');
  results.innerHTML='';

  if (!filtered.length){
    results.innerHTML = '<div class="empty-state">No KPIs match those filters. Try clearing a filter or broadening the search.</div>';
    return;
  }

  Object.entries(CATEGORIES).forEach(([key,meta])=>{
    const items = filtered.filter(k=>k.cat===key);
    if (!items.length) return;
    const section = document.createElement('section');
    section.className='section2';
    section.innerHTML = `
      <div class="section-head2" style="--sec-c:var(--cat-${key})">
        <span class="dot"></span>
        <h2>${meta.label}</h2>
        <span class="sec-count">${items.length} KPI${items.length===1?'':'s'}</span>
      </div>
      <div class="grid2">${items.map(k=>`
        <article class="kpicard" style="--card-c:var(--cat-${key})">
          <div>
            <div class="acronym font-mono">${k.acr}</div>
            <h3 class="kpi-name">${k.name}</h3>
          </div>
          <p class="definition">${k.def}</p>
          <div class="example"><b>Example</b><span>${k.ex}</span></div>
          <p class="best-when"><b>Best tracked when:</b> ${k.best}</p>
          <div class="tagrow">${k.tags.map(t=>`<span class="tag2b">${TAGS[t]}</span>`).join('')}</div>
        </article>
      `).join('')}</div>
    `;
    results.appendChild(section);
  });
}

document.getElementById('search').addEventListener('input', render);
document.getElementById('clear-filters').addEventListener('click', ()=>{
  document.querySelectorAll('.chip.active').forEach(c=>c.classList.remove('active'));
  document.getElementById('search').value='';
  render();
});

buildChips();
render();
