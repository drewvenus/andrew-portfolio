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

const KPIS = [
{cat:"foundation", acr:"CAC", name:"Customer Acquisition Cost", def:"Total sales & marketing spend divided by the number of new customers acquired in a period.", tags:["efficiency","ecommerce","b2b"]},
{cat:"foundation", acr:"LTV / CLV", name:"Customer Lifetime Value", def:"Predicted net revenue or profit a customer generates over the full relationship with the business.", tags:["retention","ecommerce","b2b"]},
{cat:"foundation", acr:"LTV:CAC", name:"LTV-to-CAC Ratio", def:"LTV divided by CAC, the return generated per dollar spent acquiring a customer.", tags:["efficiency","b2b","ecommerce"]},
{cat:"foundation", acr:"ROAS", name:"Return on Ad Spend", def:"Revenue generated per dollar of ad spend, across all paid channels combined.", tags:["ecommerce","efficiency","conversion"]},
{cat:"foundation", acr:"MER", name:"Marketing Efficiency Ratio", def:"Total revenue divided by total marketing spend across all channels, the blended version of ROAS.", tags:["ecommerce","efficiency"]},
{cat:"foundation", acr:"ROI", name:"Marketing Return on Investment", def:"(Revenue attributable to marketing − marketing cost) ÷ marketing cost, as a percentage.", tags:["b2b","efficiency"]},
{cat:"foundation", acr:"Payback Period", name:"CAC Payback Period", def:"Number of months needed for a customer's gross margin to repay the cost of acquiring them.", tags:["b2b","efficiency","retention"]},
{cat:"foundation", acr:"MQL→SQL", name:"MQL-to-SQL Conversion Rate", def:"Percentage of Marketing Qualified Leads that convert to Sales Qualified Leads.", tags:["b2b","leadgen","conversion"]},
{cat:"foundation", acr:"Pipeline Velocity", name:"Pipeline Value & Velocity", def:"Total dollar value of marketing-sourced opportunities, and the speed they move through funnel stages.", tags:["b2b","leadgen"]},

{cat:"sem", acr:"CTR", name:"Click-Through Rate (Search)", def:"Clicks divided by impressions on a search ad.", tags:["awareness","efficiency"]},
{cat:"sem", acr:"CPC", name:"Cost Per Click", def:"Average amount paid per click on a search ad.", tags:["efficiency"]},
{cat:"sem", acr:"CPA", name:"Cost Per Acquisition", def:"Ad spend divided by number of conversions.", tags:["leadgen","ecommerce","conversion"]},
{cat:"sem", acr:"CVR", name:"Conversion Rate (Search)", def:"Conversions divided by clicks.", tags:["conversion","efficiency"]},
{cat:"sem", acr:"QS", name:"Quality Score", def:"Google's 1–10 diagnostic of ad relevance, expected CTR, and landing-page experience.", tags:["efficiency"]},
{cat:"sem", acr:"Search IS", name:"Search Impression Share", def:"Impressions received divided by total eligible impressions available to the campaign.", tags:["efficiency","brand"]},
{cat:"sem", acr:"Abs. Top IS", name:"Search Absolute Top Impression Share", def:"Percentage of impressions shown in the very first ad position.", tags:["brand","conversion"]},
{cat:"sem", acr:"ROAS", name:"Return on Ad Spend (Shopping/PMax)", def:"Revenue per dollar spent within Google Ads, typically via Shopping or Performance Max.", tags:["ecommerce","efficiency"]},
{cat:"sem", acr:"CPM", name:"Cost Per Mille (Display/YouTube)", def:"Cost per 1,000 impressions.", tags:["awareness","brand"]},

{cat:"meta", acr:"CPM", name:"Cost Per Mille (Meta)", def:"Cost per 1,000 impressions on Facebook or Instagram.", tags:["awareness","efficiency"]},
{cat:"meta", acr:"CPC (Link)", name:"Cost Per Link Click", def:"Cost per click to an external destination, distinct from 'all clicks'.", tags:["conversion","efficiency"]},
{cat:"meta", acr:"CTR (Link)", name:"Link Click-Through Rate", def:"Link clicks divided by impressions.", tags:["awareness","efficiency"]},
{cat:"meta", acr:"Frequency", name:"Frequency", def:"Average number of times a unique user has seen the ad within the reporting window.", tags:["retention","efficiency"]},
{cat:"meta", acr:"CPR", name:"Cost Per Result", def:"Cost per the campaign's chosen optimization event, purchase, lead, install, etc.", tags:["leadgen","efficiency","conversion"]},
{cat:"meta", acr:"Ad Rankings", name:"Quality / Engagement / Conversion Ranking", def:"Meta's three relative diagnostics comparing an ad to competitors targeting the same audience.", tags:["efficiency","conversion"]},
{cat:"meta", acr:"Hook Rate", name:"Hook Rate (3-Second Video Views)", def:"Percentage of viewers who watch at least 3 seconds of a video ad.", tags:["awareness","conversion"]},
{cat:"meta", acr:"ROAS", name:"Return on Ad Spend (Meta)", def:"Purchase revenue per dollar of ad spend, per Meta's own attribution window.", tags:["ecommerce","efficiency"]},

{cat:"ga4", acr:"Engaged Sessions", name:"Engaged Sessions", def:"Sessions lasting 10+ seconds, containing a key event, or with 2+ pageviews.", tags:["content","conversion"]},
{cat:"ga4", acr:"Engagement Rate", name:"Engagement Rate", def:"Engaged sessions divided by total sessions.", tags:["efficiency","content"]},
{cat:"ga4", acr:"Avg. Engagement Time", name:"Average Engagement Time", def:"Average time a session was actively in focus per active user.", tags:["content","consideration"]},
{cat:"ga4", acr:"Key Events", name:"Key Events (Conversions)", def:"GA4's term for events explicitly marked as conversions.", tags:["conversion","leadgen","dataquality"]},
{cat:"ga4", acr:"Sessions/User", name:"Sessions per User", def:"Average number of sessions per user within a period.", tags:["b2b","content","consideration"]},
{cat:"ga4", acr:"DDA", name:"Data-Driven Attribution Credit", def:"GA4's default model distributing conversion credit across touchpoints.", tags:["efficiency","brand"]},
{cat:"ga4", acr:"Revenue/User", name:"Purchase Revenue per User", def:"Total or per-user transactional revenue tracked via ecommerce events.", tags:["ecommerce","conversion"]},

{cat:"gtm", acr:"Fire Rate", name:"Tag Firing Success Rate", def:"Percentage of intended tag fires that execute without error.", tags:["dataquality","efficiency"]},
{cat:"gtm", acr:"Data Layer Completeness", name:"Data Layer Completeness", def:"Percentage of required dataLayer variables present and correctly typed.", tags:["dataquality","ecommerce","leadgen"]},
{cat:"gtm", acr:"Publish Error Rate", name:"Container Publish Error Rate", def:"Frequency of GTM container versions published with misconfigurations requiring rollback.", tags:["dataquality"]},
{cat:"gtm", acr:"Consent Coverage", name:"Consent Mode Coverage", def:"Percentage of sessions where consent state is correctly signaled before tags fire.", tags:["dataquality","b2b"]},
{cat:"gtm", acr:"Duplicate Rate", name:"Duplicate / Ghost Tracking Rate", def:"Percentage of events fired more than once per user action due to redundant tags.", tags:["dataquality","ecommerce"]},

{cat:"social", acr:"Engagement Rate", name:"Engagement Rate (Organic)", def:"Likes, comments, shares, and saves divided by reach or follower count.", tags:["brand","awareness"]},
{cat:"social", acr:"Reach", name:"Reach", def:"Number of unique accounts that saw a post.", tags:["awareness","brand"]},
{cat:"social", acr:"Impressions", name:"Impressions", def:"Total number of times content displayed, including repeat views.", tags:["awareness"]},
{cat:"social", acr:"Follower Growth", name:"Follower Growth Rate", def:"Net new followers divided by starting follower count over a period.", tags:["brand","awareness"]},
{cat:"social", acr:"SOV", name:"Share of Voice (Social)", def:"Brand's mentions or engagement volume as a percentage of total category conversation.", tags:["brand","awareness"]},
{cat:"social", acr:"Completion Rate", name:"Video Completion / View-Through Rate", def:"Percentage of viewers who watch a video to completion or a set threshold.", tags:["brand","content"]},
{cat:"social", acr:"Amplification", name:"Amplification Rate", def:"Shares divided by total reach or followers.", tags:["brand","awareness"]},

{cat:"seo", acr:"Organic Traffic", name:"Organic Traffic", def:"Sessions arriving via unpaid search engine results.", tags:["content","efficiency"]},
{cat:"seo", acr:"Visibility", name:"Keyword Rankings / Visibility Score", def:"Tracked position for target keywords, aggregated into a weighted visibility index.", tags:["content","brand"]},
{cat:"seo", acr:"Organic CTR", name:"Organic CTR (SERP)", def:"Clicks divided by impressions in Search Console, by query or page.", tags:["content","efficiency"]},
{cat:"seo", acr:"DA / DR", name:"Domain Authority / Domain Rating", def:"Third-party composite score predicting ranking strength, driven largely by backlink profile.", tags:["content","brand"]},
{cat:"seo", acr:"Ref. Domains", name:"Referring Domains / Backlinks", def:"Count of unique external domains, and total links, pointing to the site.", tags:["content","brand"]},
{cat:"seo", acr:"Organic CVR", name:"Organic Conversion Rate", def:"Conversions from organic-search sessions divided by organic sessions.", tags:["content","efficiency","ecommerce"]},
{cat:"seo", acr:"CWV", name:"Core Web Vitals (LCP / INP / CLS)", def:"Google's page-experience metrics for load speed, responsiveness, and visual stability.", tags:["content","ecommerce","dataquality"]},
{cat:"seo", acr:"Index Coverage", name:"Index Coverage / Crawl Error Rate", def:"Percentage of submitted URLs successfully indexed vs. excluded or errored.", tags:["content","dataquality"]},

{cat:"gbp", acr:"GBP Views", name:"GBP Total Views (Search + Maps)", def:"Number of times the business profile was viewed on Google Search and Maps combined.", tags:["local","awareness"]},
{cat:"gbp", acr:"Directions", name:"Direction Requests", def:"Number of users who tapped 'Directions' from the profile.", tags:["local","conversion"]},
{cat:"gbp", acr:"Call Clicks", name:"Call Clicks", def:"Number of phone calls initiated directly from the GBP listing.", tags:["local","leadgen"]},
{cat:"gbp", acr:"Website Clicks", name:"Website Clicks (from GBP)", def:"Number of clicks to the business website originating from the profile.", tags:["local","conversion"]},
{cat:"gbp", acr:"Reviews", name:"Review Rating & Volume", def:"Average star rating and total count of Google reviews.", tags:["local","brand"]},
{cat:"gbp", acr:"Local Pack Rank", name:"Local Pack (Map Pack) Ranking", def:"Position within Google's top-3 local results shown for a given search-plus-location query.", tags:["local","conversion","efficiency"]},

{cat:"email", acr:"Open Rate", name:"Open Rate", def:"Percentage of delivered emails opened, tracked via pixel.", tags:["awareness","content"]},
{cat:"email", acr:"CTR", name:"Click-Through Rate (Email)", def:"Clicks divided by delivered emails.", tags:["conversion","efficiency"]},
{cat:"email", acr:"CTOR", name:"Click-to-Open Rate", def:"Clicks divided by opens, isolates content and CTA performance from subject-line performance.", tags:["content","conversion"]},
{cat:"email", acr:"CVR", name:"Conversion Rate (Email)", def:"Conversions divided by delivered (or clicked) emails.", tags:["ecommerce","leadgen","conversion"]},
{cat:"email", acr:"RPE", name:"Revenue Per Email", def:"Revenue generated divided by emails sent or delivered.", tags:["ecommerce","efficiency","retention"]},
{cat:"email", acr:"List Growth", name:"List Growth Rate", def:"Net new subscribers divided by total list size over a period.", tags:["awareness","brand"]},
{cat:"email", acr:"Unsub Rate", name:"Unsubscribe Rate", def:"Unsubscribes divided by delivered emails.", tags:["retention","dataquality"]},
{cat:"email", acr:"Inbox Placement", name:"Deliverability / Inbox Placement Rate", def:"Percentage of sent emails that land in the inbox, not spam, across major providers.", tags:["dataquality","efficiency"]},
{cat:"email", acr:"Bounce Rate", name:"Bounce Rate (Hard / Soft)", def:"Percentage of sends that fail to deliver, hard vs. soft.", tags:["dataquality"]},

{cat:"sms", acr:"Opt-In Rate", name:"Opt-In Rate", def:"Percentage of eligible contacts who subscribe to SMS.", tags:["awareness","ecommerce"]},
{cat:"sms", acr:"Delivery Rate", name:"Delivery Rate", def:"Percentage of sent messages successfully delivered to carrier and handset.", tags:["dataquality"]},
{cat:"sms", acr:"CTR", name:"Click-Through Rate (SMS)", def:"Link clicks divided by delivered messages.", tags:["ecommerce","conversion"]},
{cat:"sms", acr:"CVR", name:"Conversion Rate (SMS)", def:"Conversions attributed to the SMS send divided by delivered messages.", tags:["ecommerce","conversion","retention"]},
{cat:"sms", acr:"RPM", name:"Revenue Per Message", def:"Revenue generated divided by messages sent.", tags:["ecommerce","efficiency"]},
{cat:"sms", acr:"Opt-Out Rate", name:"Opt-Out Rate", def:"STOP replies divided by delivered messages.", tags:["retention","dataquality"]},
{cat:"sms", acr:"Response Rate", name:"Response Rate (Conversational SMS)", def:"Percentage of recipients who reply to a two-way message.", tags:["local","conversion","retention"]}
];

const INDUSTRY_LABELS = {ecommerce:"Ecommerce / DTC Retail", b2b:"B2B / SaaS", local:"Local Service Business", content:"Content / Media / Publisher", "":"Other / Mixed"};
const GOAL_LABELS = {
  "efficiency,conversion":"Grow revenue / sales efficiently",
  "leadgen,conversion":"Generate leads / pipeline",
  "awareness,brand":"Build brand awareness",
  "retention":"Improve retention / loyalty",
  "dataquality":"Strengthen measurement / data foundation"
};

function buildChannelChips(){
  const group = document.getElementById('channel-group');
  Object.entries(CATEGORIES).forEach(([key,meta])=>{
    const b = document.createElement('button');
    b.type='button';
    b.className='chan-chip'+(key==='foundation' ? ' active':'');
    b.dataset.chan=key;
    b.textContent=meta.short;
    b.style.setProperty('--chip-c', `var(--cat-${key})`);
    b.addEventListener('click',()=>b.classList.toggle('active'));
    group.appendChild(b);
  });
}

function selectedChannels(){
  return Array.from(document.querySelectorAll('.chan-chip.active')).map(b=>b.dataset.chan);
}
function selectedStages(){
  return Array.from(document.querySelectorAll('#stage-group input:checked')).map(i=>i.value);
}

let lastBuild = null;

function build(){
  const channels = selectedChannels();
  if (!channels.length){
    alert('Select at least one live channel before building a recommended set.');
    return;
  }
  const industryVal = document.getElementById('industry').value;
  const goalVal = document.getElementById('goal').value;
  const stageVals = selectedStages();
  const matchTags = new Set([...(goalVal?goalVal.split(','):[]), ...(industryVal?[industryVal]:[]), ...stageVals]);

  const sections = document.getElementById('sections');
  sections.innerHTML='';
  let totalCards = 0;

  Object.entries(CATEGORIES).forEach(([key,meta])=>{
    if (!channels.includes(key)) return;
    const items = KPIS.filter(k=>k.cat===key);
    if (!items.length) return;
    totalCards += items.length;

    const section = document.createElement('div');
    section.className='section2';
    const matchedCount = items.filter(k=>matchTags.size===0 || k.tags.some(t=>matchTags.has(t))).length;
    section.innerHTML = `
      <div class="section-head2" style="--sec-c:var(--cat-${key})">
        <span class="dot"></span><h3>${meta.label}</h3>
        <span class="n">${matchedCount} of ${items.length} matched</span>
      </div>
      <div class="kgrid">${items.map((k,i)=>{
        const matched = matchTags.size===0 || k.tags.some(t=>matchTags.has(t));
        return `
        <label class="kcard ${matched?'':'unmatched'}" style="--card-c:var(--cat-${key})" data-cat="${key}" data-acr="${k.acr.replace(/"/g,'&quot;')}" data-name="${k.name.replace(/"/g,'&quot;')}" data-def="${k.def.replace(/"/g,'&quot;')}">
          <input type="checkbox" ${matched?'checked':''} data-kpi>
          <div class="body">
            <div class="top">
              <span class="acr">${k.acr}</span>
              ${matched?'<span class="matched-badge">Matched</span>':''}
            </div>
            <div class="nm">${k.name}</div>
            <p class="why">${k.def}</p>
          </div>
        </label>`;
      }).join('')}</div>
    `;
    sections.appendChild(section);
  });

  document.querySelectorAll('#sections input[data-kpi]').forEach(cb=>cb.addEventListener('change', updateOutput));

  lastBuild = {
    clientName: document.getElementById('client-name').value.trim() || 'Untitled engagement',
    industryLabel: INDUSTRY_LABELS[industryVal] || 'Not specified',
    goalLabel: GOAL_LABELS[goalVal] || 'Not specified',
    stageLabels: stageVals.length ? stageVals.map(s=>s[0].toUpperCase()+s.slice(1)).join(', ') : 'Not specified',
    channelLabels: channels.map(c=>CATEGORIES[c].short).join(', ')
  };

  document.getElementById('results').classList.add('show');
  updateOutput();
  document.getElementById('results').scrollIntoView({behavior:'smooth', block:'start'});
}

function updateOutput(){
  const checked = Array.from(document.querySelectorAll('#sections input[data-kpi]:checked'))
    .map(cb=>cb.closest('.kcard'));

  document.getElementById('sel-count').textContent = checked.length;
  document.getElementById('sel-meta').innerHTML = checked.length
    ? `KPIs selected for <b>${lastBuild.clientName}</b>, edit checkboxes below, the summary updates live.`
    : `No KPIs selected yet, check boxes below to build the set.`;

  let out = `KPI SET, ${lastBuild.clientName}\n`;
  out += `Industry: ${lastBuild.industryLabel}  ·  Goal: ${lastBuild.goalLabel}\n`;
  out += `Funnel focus: ${lastBuild.stageLabels}  ·  Channels: ${lastBuild.channelLabels}\n`;
  out += `\n`;

  Object.entries(CATEGORIES).forEach(([key,meta])=>{
    const items = checked.filter(el=>el.dataset.cat===key);
    if (!items.length) return;
    out += `${meta.label.toUpperCase()}\n`;
    items.forEach(el=>{
      out += `- ${el.dataset.acr} (${el.dataset.name}), ${el.dataset.def}\n`;
    });
    out += `\n`;
  });

  document.getElementById('output-text').value = out.trim();
}

document.getElementById('build-btn').addEventListener('click', build);
document.getElementById('reset-btn').addEventListener('click', ()=>{
  document.getElementById('client-name').value='';
  document.getElementById('industry').value='';
  document.getElementById('goal').value='';
  document.querySelectorAll('#stage-group input').forEach(i=>i.checked=false);
  document.querySelectorAll('.chan-chip').forEach(b=>b.classList.remove('active'));
  document.querySelector('.chan-chip[data-chan="foundation"]').classList.add('active');
  document.getElementById('results').classList.remove('show');
  document.getElementById('sections').innerHTML='';
});
document.getElementById('copy-btn').addEventListener('click', ()=>{
  const text = document.getElementById('output-text').value;
  const status = document.getElementById('copy-status');
  const showStatus = (msg)=>{ status.textContent=msg; status.classList.add('show'); setTimeout(()=>status.classList.remove('show'),1800); };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>showStatus('Copied.')).catch(()=>{
      document.getElementById('output-text').select();
      showStatus('Press Cmd/Ctrl+C, text is selected.');
    });
  } else {
    document.getElementById('output-text').select();
    showStatus('Press Cmd/Ctrl+C, text is selected.');
  }
});

buildChannelChips();
