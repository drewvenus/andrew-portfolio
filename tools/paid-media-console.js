"use strict";

/* ================= DATA: CATEGORIES / TAGS / CHECKS ================= */
const CATEGORIES = {
  se: {label:"Search / SEM — Google Ads", short:"Search / SEM"},
  ps: {label:"Paid Social", short:"Paid Social"},
  dr: {label:"Display & Retargeting", short:"Display / Retarget"},
  sh: {label:"Shopping / Retail Media", short:"Shopping"},
  bp: {label:"Bid & Budget Pacing", short:"Bid & Pacing"},
  cr: {label:"Ad Copy & Creative", short:"Ad Copy"}
};
const TAGS = {
  efficiency:"Budget Efficiency", conversion:"Conversion", awareness:"Awareness", brand:"Brand",
  ecommerce:"Ecommerce", b2b:"B2B / SaaS", leadgen:"Lead Gen", dataquality:"Data Quality"
};

const CHECKS = [
{cat:"se", code:"SE1", name:"Match Type Discipline", def:"Are exact/phrase/broad match types deliberately chosen per keyword tier, not defaulted to broad across the board?", ex:"An account with 400 keywords, all on broad match, spending 70% of budget on terms that never appear in the search-term report as intentional targets.", best:"New accounts and any account inheriting a legacy keyword list from a prior agency.", tags:["efficiency","leadgen"], red:"100% broad match, no tiering by intent.", common:"Mixed match types but no documented reason per tier.", best_practice:"Exact/phrase reserved for proven converters, broad paired with automated bidding and tight negatives."},
{cat:"se", code:"SE2", name:"Negative Keyword Coverage", def:"Is there an active negative keyword list built from search term reports, reviewed on a set cadence?", ex:"A plumbing account discovers 18% of spend went to \"plumbing jobs\" and \"plumber salary\" searches after six months with no negative list.", best:"Broad and phrase match campaigns, and any account with a search-term report nobody has reviewed in 30+ days.", tags:["efficiency"], red:"No negative list, or one that hasn't been touched since launch.", common:"A shared negative list applied inconsistently across campaigns.", best_practice:"Negative list reviewed weekly against fresh search terms, tiered by campaign."},
{cat:"se", code:"SE3", name:"Quality Score Components", def:"Are expected CTR, ad relevance, and landing page experience each individually diagnosed when Quality Score is low, not treated as one opaque number?", ex:"QS drops from 7 to 4; the team lowers bids account-wide instead of checking that the landing page's load time doubled after a redesign.", best:"Any keyword-based Search campaign with CPCs climbing faster than competitive pressure alone explains.", tags:["efficiency"], red:"QS treated as a single unexplained score, bids adjusted blindly.", common:"QS checked occasionally but the three components not diagnosed separately.", best_practice:"Below-average component flagged and root-caused before any bid change."},
{cat:"se", code:"SE4", name:"Search Impression Share Loss", def:"Is impression share loss broken out between \"lost to budget\" and \"lost to rank,\" since the fix for each is different?", ex:"An account sees IS drop from 65% to 40% and raises budget, when the real cause was a Quality Score decline pushing rank down.", best:"Scaling decisions and brand-defense campaigns where visibility loss has a real revenue cost.", tags:["efficiency","brand"], red:"IS loss reported as one number with no budget/rank split.", common:"Split is available but not reviewed before reacting to a visibility drop.", best_practice:"Both loss types checked before any budget or bid change is made."},
{cat:"se", code:"SE5", name:"RSA Asset Coverage", def:"Does each ad group have at least 8-10 unique headlines and 3-4 descriptions, not just the platform minimum?", ex:"An ad group running on 3 headlines and 2 descriptions since 2022, capped at \"Poor\" Ad Strength the entire time.", best:"Any Search campaign relying on Google's algorithm to combinatorially test headline/description pairs.", tags:["efficiency","conversion"], red:"Minimum viable assets (3 headlines, 2 descriptions), Ad Strength stuck at Poor.", common:"5-6 headlines but several near-duplicates that don't add real variation.", best_practice:"8-10+ distinct angles per ad group, Ad Strength Good or Excellent."},
{cat:"se", code:"SE6", name:"Campaign-Keyword Structure Fit", def:"Does campaign/ad-group structure group keywords tightly enough that one ad message can serve the whole group?", ex:"An ad group mixing \"emergency plumber\" and \"bathroom remodel quote\" under one generic ad, serving neither search intent well.", best:"Accounts with more than 50 keywords, or any account where CTR varies wildly within the same ad group.", tags:["efficiency","conversion"], red:"Loosely themed ad groups mixing unrelated intents.", common:"Reasonable grouping but ad copy not tailored to the tightest common theme.", best_practice:"SKAG-adjacent tight grouping, one clear message per ad group."},
{cat:"se", code:"SE7", name:"Auction Insights Monitoring", def:"Is auction insights data reviewed regularly to catch new competitors bidding into the account's terms?", ex:"A new competitor enters the auction and overlap rate with the account jumps from 12% to 45% over a month, unnoticed until CPCs spike.", best:"Competitive verticals (legal, home services, insurance) where new entrants can shift the auction fast.", tags:["efficiency","brand"], red:"Auction insights never checked outside of a full account audit.", common:"Checked quarterly, missing fast-moving competitive shifts.", best_practice:"Reviewed monthly at minimum, with alerts on overlap-rate spikes."},

{cat:"ps", code:"PS1", name:"Objective-to-Funnel-Stage Match", def:"Does the campaign objective (awareness, consideration, conversion) match where the target audience actually sits in the funnel?", ex:"A cold prospecting campaign running on a Conversions objective with a pixel that has under 50 events a week — starving the algorithm of signal.", best:"New campaign launches and any account with objective mismatches inherited from a prior manager.", tags:["efficiency","conversion"], red:"Conversion objective used for a cold, low-signal audience.", common:"Objective roughly matches funnel stage but isn't revisited as the audience warms.", best_practice:"Objective explicitly tied to funnel stage and signal volume, reviewed each quarter."},
{cat:"ps", code:"PS2", name:"Pixel/Conversion API Coverage", def:"Is server-side tracking (Conversions API/Enhanced Conversions) layered on top of browser pixels to offset signal loss?", ex:"Reported conversions run 30% below CRM-verified sales after iOS 14.5, with no server-side event bridging the gap.", best:"Any account running iOS-heavy audiences or with ad blockers materially affecting reported traffic.", tags:["dataquality","efficiency"], red:"Browser pixel only, no server-side signal.", common:"CAPI installed but not deduplicated correctly against the browser pixel.", best_practice:"CAPI/Enhanced Conversions live, deduplicated, event match quality monitored."},
{cat:"ps", code:"PS3", name:"Audience Overlap Check", def:"Have overlapping audiences across active ad sets been checked to avoid the account competing against itself in auction?", ex:"Two ad sets targeting \"website visitors 30 days\" and \"website visitors 7 days\" run simultaneously, bidding against each other for the same users.", best:"Accounts running more than 3-4 concurrent ad sets, especially with layered retargeting windows.", tags:["efficiency"], red:"Multiple ad sets with 40%+ audience overlap and no exclusions.", common:"Some overlap exists but hasn't been checked in the Audience Overlap tool.", best_practice:"Overlap checked before launch, exclusions applied to keep ad sets distinct."},
{cat:"ps", code:"PS4", name:"Creative Fatigue Threshold", def:"Is frequency or CTR decline monitored per creative to catch fatigue before performance visibly drops?", ex:"Frequency climbs from 2.1 to 6.8 over three weeks on a single always-on retargeting creative while CTR quietly halves.", best:"Always-on retargeting and any campaign running the same creative for 3+ weeks.", tags:["efficiency","conversion"], red:"No frequency monitoring, same creative running 30+ days.", common:"Frequency checked occasionally but no defined fatigue threshold.", best_practice:"Defined frequency ceiling per funnel stage, creative refreshed before it's hit."},
{cat:"ps", code:"PS5", name:"Lookalike Seed Quality", def:"Is the seed audience for lookalike/similar audiences a high-intent list (purchasers), not just page followers?", ex:"A 1% lookalike built from page likers instead of purchasers, producing an audience that engages but rarely converts.", best:"Ecommerce and lead-gen accounts scaling beyond retargeting into cold prospecting.", tags:["efficiency","ecommerce"], red:"Lookalikes seeded from low-intent lists (followers, video viewers).", common:"Seeded from site visitors, better than followers but still mixed-intent.", best_practice:"Seeded from purchasers or highest-value CRM segment, refreshed quarterly."},
{cat:"ps", code:"PS6", name:"Placement Automation vs Control", def:"Is automatic placement expansion reviewed periodically to exclude consistently underperforming placements?", ex:"Audience Network placements quietly consume 15% of budget at 4x the CPA of Feed and Stories, unnoticed because reporting is viewed at the ad-set level only.", best:"Any campaign running Advantage+ or automatic placements without a placement-level performance review.", tags:["efficiency"], red:"Automatic placements never broken out or reviewed by performance.", common:"Reviewed at launch but not revisited as spend scales.", best_practice:"Placement-level performance reviewed monthly, chronic underperformers excluded."},
{cat:"ps", code:"PS7", name:"Platform-Native Creative Format", def:"Is creative built natively for each platform's aspect ratio and format, not a single repurposed asset stretched across all?", ex:"A single 16:9 landscape video, letterboxed into Stories and Reels placements, losing the top third to platform UI overlap.", best:"Any campaign running across Feed, Stories, and Reels simultaneously.", tags:["awareness","conversion"], red:"One asset stretched or letterboxed across all placements.", common:"Square 1:1 used everywhere as a compromise format.", best_practice:"Native 9:16 for Stories/Reels, native 1:1 or 4:5 for Feed, cut separately."},

{cat:"dr", code:"DR1", name:"Frequency Capping by Funnel Stage", def:"Are frequency caps tighter for cold prospecting and looser for warm retargeting, rather than one blanket cap?", ex:"A single frequency cap of 3/week applied to both a cold prospecting campaign and a cart-abandonment retargeting campaign, underserving the retargeting audience.", best:"Any account running both prospecting and retargeting display campaigns concurrently.", tags:["efficiency"], red:"One blanket frequency cap across all funnel stages.", common:"Caps set per campaign but not deliberately tied to funnel stage.", best_practice:"Tight caps on cold prospecting, looser caps on high-intent retargeting."},
{cat:"dr", code:"DR2", name:"Retargeting Window Segmentation", def:"Are retargeting audiences segmented by recency (e.g., 1-day cart abandoners vs 30-day site visitors) with different messages?", ex:"A 30-day \"all site visitors\" retargeting pool shown the same generic ad as yesterday's cart abandoners, wasting the higher-intent segment's urgency window.", best:"Ecommerce accounts with cart or product-view events, and any account with retargeting pool sizes over a few thousand.", tags:["efficiency","ecommerce"], red:"One undifferentiated retargeting pool and message for all recency windows.", common:"Two or three windows exist but messaging doesn't change between them.", best_practice:"Recency-tiered pools (1-day/7-day/30-day) each with distinct, urgency-matched messaging."},
{cat:"dr", code:"DR3", name:"View-Through vs Click-Through Attribution", def:"Is view-through conversion credit reported separately from click-through, to avoid overstating display's contribution?", ex:"A display campaign reports 200 conversions, but 180 are view-through — meaning the user converted without ever clicking the ad.", best:"Any account reporting display or programmatic performance alongside search/social in a blended view.", tags:["dataquality","efficiency"], red:"View-through and click-through conversions blended into one reported number.", common:"Split is available in the platform but not surfaced in client reporting.", best_practice:"Reported separately, with view-through weighted down relative to click-through in decision-making."},
{cat:"dr", code:"DR4", name:"Placement Exclusion List", def:"Is there an active exclusion list for low-quality placements and made-for-advertising sites?", ex:"A programmatic display campaign discovers 8% of impressions served on a network of clickbait \"slideshow\" sites with near-zero viewability.", best:"Any programmatic or Google Display Network campaign running on automatic placements.", tags:["efficiency","brand"], red:"No exclusion list, placements never audited by domain.", common:"A generic exclusion list applied once at setup and never updated.", best_practice:"Placement report reviewed monthly, exclusion list actively maintained."},
{cat:"dr", code:"DR5", name:"Ad Blindness Monitoring", def:"Is creative rotated on a defined cadence to prevent banner blindness in always-on retargeting?", ex:"The same static banner has run in an always-on retargeting campaign for four months; CTR has drifted from 0.8% to 0.15%.", best:"Always-on retargeting campaigns with no natural end date.", tags:["efficiency"], red:"Same creative running 60+ days with no refresh plan.", common:"Creative refreshed occasionally but not on a defined cadence.", best_practice:"Refresh cadence defined (e.g., every 3-4 weeks) and tracked against a calendar."},
{cat:"dr", code:"DR6", name:"Converted-User Suppression", def:"Are converted users suppressed from retargeting pools within a defined window to avoid wasted spend?", ex:"A customer who purchased yesterday sees the same cart-abandonment retargeting ad today, for a product they already bought.", best:"Any ecommerce or lead-gen account with a retargeting program and a purchase or lead-submit conversion event.", tags:["efficiency","ecommerce"], red:"No suppression, converted users remain in active retargeting pools indefinitely.", common:"Suppression exists but the window is too short for the purchase cycle.", best_practice:"Suppression window matched to realistic repurchase or re-engagement cycle."},

{cat:"sh", code:"SH1", name:"Feed Data Quality", def:"Are product titles, GTINs, and categories accurate and complete, since Shopping relies entirely on feed quality rather than keywords?", ex:"A product feed with generic titles like \"Item 4521\" instead of \"Men's Waterproof Hiking Boot, Size 10, Brown\" — Google has almost nothing to match against real queries.", best:"Every Shopping and Performance Max campaign — feed quality is the single biggest lever in this surface.", tags:["ecommerce","efficiency"], red:"Missing GTINs, generic titles, thin or missing product categories.", common:"Titles are descriptive but not optimized with the attributes shoppers actually search.", best_practice:"Titles follow a Brand + Attribute + Product + Model convention, GTINs complete, categories accurate to Google's taxonomy."},
{cat:"sh", code:"SH2", name:"Product Grouping Granularity", def:"Is the product feed segmented into groups granular enough to bid differently on high vs low margin SKUs?", ex:"A single product group covering the entire catalog gets one bid, meaning a $15-margin item and a $150-margin item receive identical bid pressure.", best:"Catalogs with meaningful margin variance across SKUs or categories.", tags:["ecommerce","efficiency"], red:"One flat product group for the whole catalog.", common:"Grouped by category but not by margin or performance tier.", best_practice:"Grouped by margin tier or performance history, bids set independently per group."},
{cat:"sh", code:"SH3", name:"Negative Keyword Hygiene (Shopping)", def:"Is there a negative keyword list specific to Shopping campaigns, reviewed separately from Search?", ex:"A Shopping campaign for premium cookware spends 12% of budget on \"cheap\" and \"used\" queries because Search's negative list was never applied to Shopping.", best:"Any standard Shopping campaign (not Performance Max, where negatives work differently).", tags:["ecommerce","efficiency"], red:"No Shopping-specific negative list, or Search negatives assumed to carry over.", common:"A negative list exists but hasn't been updated since a category expansion.", best_practice:"Shopping-specific negatives reviewed against the search-term report on its own cadence."},
{cat:"sh", code:"SH4", name:"MAP/Price Compliance", def:"Are listed prices checked against manufacturer MAP policy and competitor pricing on a set cadence?", ex:"A retailer's feed price falls below a manufacturer's MAP floor after an automated repricing tool reacts to a competitor, risking the account's ability to sell that brand at all.", best:"Any retailer selling branded products with manufacturer pricing agreements.", tags:["ecommerce","dataquality"], red:"No MAP monitoring, pricing set purely by automated repricing rules.", common:"MAP checked manually and infrequently, gaps between checks.", best_practice:"Automated MAP monitoring with alerts before a violation goes live."},
{cat:"sh", code:"SH5", name:"Merchant Center Health", def:"Are Merchant Center disapprovals and warnings monitored and resolved on a defined SLA, not left to accumulate?", ex:"A batch of 200 products silently disapproved for a missing GTID field, invisible in campaign reporting until Shopping impression share crashes.", best:"Every Shopping account — disapprovals directly remove products from the auction with no campaign-level warning.", tags:["ecommerce","dataquality"], red:"Merchant Center diagnostics page never checked outside of a crisis.", common:"Checked when performance drops, reactive rather than proactive.", best_practice:"Checked on a fixed cadence (e.g., weekly) with a defined resolution SLA."},
{cat:"sh", code:"SH6", name:"Performance Max vs Standard Shopping Split", def:"Is there a deliberate decision (not default) on how much budget flows to Performance Max vs standard Shopping campaigns?", ex:"An account runs 100% of Shopping budget through Performance Max by default, with zero visibility into which search terms or placements are actually driving results.", best:"Any account weighing automation and reach against reporting granularity and control.", tags:["ecommerce","efficiency"], red:"100% PMax by default with no standard Shopping campaign for comparison or insulation.", common:"Mixed but the split was never revisited after initial setup.", best_practice:"Split deliberately chosen based on need for granularity vs automation, revisited quarterly."},

{cat:"bp", code:"BP1", name:"Daily Pacing vs Monthly Budget", def:"Is daily spend tracked against a monthly budget curve, catching over/underpacing before month-end?", ex:"An account spends 70% of its monthly budget in the first 12 days, then goes dark for the rest of the month once the daily cap is hit.", best:"Every active campaign — pacing drift compounds quickly if unchecked.", tags:["efficiency"], red:"No pacing curve tracked, budget exhausted early or left unspent at month-end.", common:"Checked weekly but reactive rather than proactive about the trend.", best_practice:"Daily pacing tracked against an even (or intentionally weighted) budget curve, adjusted before drift compounds."},
{cat:"bp", code:"BP2", name:"Bid Strategy-to-Goal Fit", def:"Does the automated bid strategy (Target CPA/ROAS, Maximize Conversions) match the stated campaign goal, not just platform defaults?", ex:"A brand-awareness campaign running Maximize Conversions, optimizing toward a low-value \"newsletter signup\" event instead of the actual awareness goal.", best:"Any campaign launch or bid-strategy change — mismatches here quietly optimize toward the wrong outcome.", tags:["efficiency","conversion"], red:"Bid strategy left at platform default without checking goal alignment.", common:"Strategy roughly fits but wasn't revisited after the campaign's goal shifted.", best_practice:"Bid strategy explicitly chosen to match the current stated goal, revisited when goals change."},
{cat:"bp", code:"BP3", name:"Learning Phase Discipline", def:"Are budget or bid changes limited during a campaign's learning phase to avoid resetting optimization?", ex:"A campaign's budget is adjusted three times in its first five days, resetting the learning phase each time and leaving it perpetually unoptimized.", best:"New campaign launches and any campaign coming off a major targeting or creative change.", tags:["efficiency"], red:"Frequent budget/bid changes during learning phase, algorithm never stabilizes.", common:"Learning phase respected inconsistently depending on who's managing the account.", best_practice:"Changes batched and limited during learning phase, ideally one meaningful change at a time."},
{cat:"bp", code:"BP4", name:"Portfolio Bid Strategy Consolidation", def:"Are similar campaigns grouped into a shared/portfolio bid strategy where volume supports it, rather than each optimizing in isolation?", ex:"Five near-identical geo-targeted campaigns each optimize in isolation with thin, statistically noisy conversion data, when combined they'd have enough volume to bid confidently.", best:"Accounts with multiple similar campaigns each below the conversion volume needed for reliable automated bidding.", tags:["efficiency"], red:"Fragmented campaigns each below the volume threshold for reliable automated bidding.", common:"Some consolidation exists but not applied consistently across similar campaign sets.", best_practice:"Similar campaigns pooled into portfolio bid strategies wherever volume alone would otherwise starve optimization."},
{cat:"bp", code:"BP5", name:"Day-Parting Analysis", def:"Has performance-by-hour/day been reviewed to identify dayparting opportunities before applying bid adjustments?", ex:"A B2B lead-gen account spends 30% of budget on weekend traffic that converts at a third the rate of weekday business-hours traffic, with no dayparting adjustment applied.", best:"B2B and appointment-based service accounts with a clear business-hours conversion pattern.", tags:["efficiency","b2b"], red:"No hour/day performance review, budget spread evenly regardless of conversion pattern.", common:"Pattern is visible in reporting but no bid adjustment has been applied.", best_practice:"Dayparting bid adjustments applied based on a reviewed hour/day performance breakdown."},
{cat:"bp", code:"BP6", name:"Budget Reallocation Cadence", def:"Is budget reallocated between campaigns/channels on a set review cadence based on marginal efficiency, not left static?", ex:"A channel mix set at launch six months ago stays untouched even as one channel's CPA has crept up 40% while another's has improved.", best:"Multi-channel accounts where relative channel efficiency shifts over time.", tags:["efficiency"], red:"Budget split fixed at launch, never revisited against changing marginal efficiency.", common:"Reallocated occasionally, but only when someone happens to notice a problem.", best_practice:"Reviewed on a fixed cadence (e.g., monthly) with budget shifted toward the marginally more efficient channel."},
{cat:"bp", code:"BP7", name:"Target CPA/ROAS Realism Check", def:"Is the target CPA/ROAS set based on account history and margin, not an arbitrary round number?", ex:"A client asks for a $20 Target CPA when the account's realistic historical average is $65, and the algorithm responds by starving spend to chase an unreachable target.", best:"Whenever a Target CPA/ROAS bid strategy is set or changed.", tags:["efficiency"], red:"Target set from a wish or a round number with no tie to account history.", common:"Roughly based on history but not adjusted for recent trend or margin changes.", best_practice:"Target grounded in trailing account data and margin, with a documented rationale."},

{cat:"cr", code:"CR1", name:"RSA Headline Diversity", def:"Do headlines cover distinct value props/angles rather than minor rewordings of the same phrase?", ex:"Ten headlines that are all variations of \"Best Plumber Near You,\" giving Google's algorithm nothing meaningfully different to test.", best:"Every RSA — this is the single most common reason Ad Strength gets stuck at Poor or Average.", tags:["conversion","efficiency"], red:"Headlines are near-duplicates of the same single angle.", common:"Some variety but 2-3 angles repeated with minor word swaps.", best_practice:"Distinct angles covering benefit, offer, proof, urgency, and brand, each genuinely different."},
{cat:"cr", code:"CR2", name:"Asset Pinning Discipline", def:"Is pinning used sparingly and only when brand/legal requires a fixed position, since over-pinning limits the algorithm's testing?", ex:"All five headline slots pinned to fixed positions \"to be safe,\" reducing a 15-headline RSA to functionally 3 possible combinations.", best:"Any RSA where more than 2-3 assets are pinned.", tags:["efficiency"], red:"Most or all assets pinned, algorithm has almost nothing left to test.", common:"One or two assets pinned for a real reason (legal disclaimer, brand name).", best_practice:"Pinning reserved for genuine compliance needs, rest left open for combinatorial testing."},
{cat:"cr", code:"CR3", name:"Ad Copy-to-Landing-Page Message Match", def:"Does ad copy's specific promise match what the landing page actually delivers above the fold?", ex:"An ad promising \"20% Off Your First Order\" lands on a generic homepage with no visible offer, forcing the visitor to hunt for the promised discount.", best:"Every paid landing page — message mismatch is one of the most common, most fixable causes of post-click drop-off.", tags:["conversion"], red:"Ad promise not visible or findable above the fold on the landing page.", common:"Message roughly matches but requires scrolling or hunting to confirm.", best_practice:"The specific ad promise restated clearly above the fold, in the visitor's first few seconds."},
{cat:"cr", code:"CR4", name:"Creative Refresh Cadence", def:"Is there a defined cadence for refreshing paid social creative before frequency-driven fatigue sets in?", ex:"A single video ad has run unchanged for 10 weeks in an always-on campaign, well past the point frequency data shows fatigue setting in.", best:"Always-on paid social campaigns, especially retargeting.", tags:["efficiency","conversion"], red:"No refresh schedule, creative changed only when someone notices a performance drop.", common:"Refreshed reactively when CTR visibly declines.", best_practice:"Refresh cadence defined and tied to frequency/CTR thresholds, not just a calendar guess."},
{cat:"cr", code:"CR5", name:"CTA Clarity Per Platform", def:"Does the CTA match platform conventions and objective (e.g., \"Shop Now\" vs \"Learn More\" aligned to funnel stage)?", ex:"A cold awareness campaign uses \"Shop Now\" as its CTA, asking a first-touch audience for a purchase-level commitment they aren't ready to make.", best:"Every ad — CTA mismatch is a small detail with an outsized effect on qualified click-through.", tags:["conversion"], red:"High-commitment CTA used on cold, top-of-funnel traffic.", common:"CTA is reasonable but wasn't deliberately matched to funnel stage.", best_practice:"CTA commitment level explicitly matched to the audience's actual readiness to act."},
{cat:"cr", code:"CR6", name:"UTM/Naming Convention Consistency", def:"Is there a consistent campaign naming and UTM convention across platforms, enabling clean cross-channel reporting?", ex:"Google Ads uses \"Q3_Search_Brand,\" Meta uses \"meta-brand-q3-v2\" — no shared structure, making blended channel reporting a manual reconciliation project every month.", best:"Any account running paid media across more than one platform.", tags:["dataquality","efficiency"], red:"No shared naming convention, UTMs inconsistent or missing on some channels.", common:"A convention exists on paper but isn't consistently followed.", best_practice:"A documented, enforced naming/UTM convention applied identically across every platform."},
{cat:"cr", code:"CR7", name:"Ad Copy Compliance Review", def:"Is ad copy checked against platform policy (e.g., Meta special ad categories, Google restricted content) before launch to avoid disapprovals?", ex:"A campaign launches with \"Guaranteed Results\" language in a regulated category, triggering a Meta special-ad-category review that pauses delivery for days.", best:"Regulated categories (finance, healthcare, housing, employment) and any account with a history of disapprovals.", tags:["dataquality","efficiency"], red:"Copy submitted with no policy pre-check, disapprovals discovered after launch.", common:"Checked for obvious violations but not against category-specific rules.", best_practice:"Policy review built into the pre-launch checklist, category-specific rules checked explicitly."}
];
const CHECK_BY_KEY = {};
CHECKS.forEach(c => { CHECK_BY_KEY[c.cat+"|"+c.code] = c; });
const ckey = c => c.cat+"|"+c.code;
const findCheck = key => CHECK_BY_KEY[key];

/* ================= QUICK DIAGNOSIS: symptom -> checks ================= */
const SYMPTOMS = [
  {id:"cpa-rising", label:"CPA is rising", causes:[
    {ref:"se|SE3", reason:"A Quality Score component (CTR, relevance, or landing page) may have quietly degraded, pushing CPCs up."},
    {ref:"bp|BP7", reason:"The target CPA itself may be unrealistic relative to account history, forcing inefficient bidding."},
    {ref:"ps|PS4", reason:"If this is a social campaign, creative fatigue often shows up first as a slow CPA climb."},
    {ref:"se|SE1", reason:"Broad match with no negative discipline can quietly widen into low-intent, expensive traffic."}
  ]},
  {id:"ctr-dropping", label:"CTR is dropping", causes:[
    {ref:"cr|CR1", reason:"Headline fatigue or low asset diversity reduces the algorithm's ability to keep testing fresh angles."},
    {ref:"ps|PS4", reason:"Rising frequency on the same creative is the most common cause of a slow CTR decline."},
    {ref:"se|SE5", reason:"Thin RSA asset coverage caps how much the algorithm can rotate to find a working combination."}
  ]},
  {id:"is-lost-budget", label:"Impression share lost to budget", causes:[
    {ref:"bp|BP1", reason:"Check daily pacing first — the campaign may be capping out before the end of each day."},
    {ref:"bp|BP6", reason:"Budget may be misallocated relative to this campaign's marginal efficiency versus others."}
  ]},
  {id:"is-lost-rank", label:"Impression share lost to rank", causes:[
    {ref:"se|SE3", reason:"Rank loss is usually a Quality Score problem, not a bid problem — diagnose the component first."},
    {ref:"se|SE6", reason:"Loosely themed ad groups produce weaker ad relevance, which drags rank down."}
  ]},
  {id:"roas-declining", label:"ROAS is declining", causes:[
    {ref:"sh|SH1", reason:"For Shopping traffic, feed quality issues (titles, categories) directly degrade match quality and ROAS."},
    {ref:"bp|BP2", reason:"Bid strategy may no longer fit the stated goal, especially after a recent change in campaign objective."},
    {ref:"sh|SH4", reason:"A MAP or pricing compliance issue can silently suppress the highest-margin products from serving."}
  ]},
  {id:"frequency-spiking", label:"Frequency is spiking / ad fatigue", causes:[
    {ref:"ps|PS4", reason:"This is the direct symptom this heuristic is built to catch — check the defined fatigue threshold."},
    {ref:"cr|CR4", reason:"No refresh cadence in place lets frequency climb unchecked on the same asset."},
    {ref:"dr|DR5", reason:"For display, banner blindness follows the same pattern — check the rotation cadence."}
  ]},
  {id:"shopping-is-dropped", label:"Shopping impression share dropped suddenly", causes:[
    {ref:"sh|SH5", reason:"A sudden drop is the classic signature of a Merchant Center disapproval — check diagnostics first."},
    {ref:"sh|SH1", reason:"A recent feed or catalog change may have broken required fields like GTIN."}
  ]},
  {id:"meta-cpr-up", label:"Cost per result increased on Meta", causes:[
    {ref:"ps|PS3", reason:"Overlapping ad sets can drive up cost by having the account compete against itself in auction."},
    {ref:"ps|PS6", reason:"An underperforming automatic placement may be consuming a growing share of budget."},
    {ref:"cr|CR1", reason:"Creative fatigue on the primary ad set is a common quiet driver of rising cost per result."}
  ]},
  {id:"conversions-dropped-clicks-steady", label:"Conversions dropped but clicks/traffic held steady", causes:[
    {ref:"cr|CR3", reason:"A landing page or offer mismatch can silently break the click-to-conversion step even when top-of-funnel volume holds."},
    {ref:"ps|PS2", reason:"A tracking or pixel issue can make real conversions simply stop being counted — rule this out before assuming a demand problem."}
  ]},
  {id:"budget-exhausted-early", label:"Budget exhausted early in the day", causes:[
    {ref:"bp|BP1", reason:"This is a direct daily-pacing symptom — check the pacing curve against the monthly budget."},
    {ref:"bp|BP5", reason:"If spend concentrates in low-converting hours, dayparting could redirect budget to when it actually converts."}
  ]},
  {id:"new-competitor", label:"A new competitor appears to be entering the auction", causes:[
    {ref:"se|SE7", reason:"Auction insights will confirm this directly and show the overlap-rate trend."},
    {ref:"se|SE3", reason:"Rising CPCs from new competition can look identical to a Quality Score problem — rule QS out first."}
  ]},
  {id:"high-spend-low-quality-leads", label:"High spend, low quality leads", causes:[
    {ref:"se|SE1", reason:"Broad match with weak negative coverage is the most common cause of volume without qualification."},
    {ref:"se|SE2", reason:"Check the search-term report directly for the specific low-intent queries draining spend."}
  ]},
  {id:"retargeting-underperforming", label:"Retargeting pool underperforming", causes:[
    {ref:"dr|DR2", reason:"An undifferentiated pool mixing high- and low-intent visitors dilutes message relevance."},
    {ref:"dr|DR6", reason:"Converted users may not be suppressed, wasting spend on people who already bought."}
  ]},
  {id:"disapprovals", label:"Ads or products getting disapproved", causes:[
    {ref:"cr|CR7", reason:"For ad copy, a pre-launch policy check against category-specific rules would catch this before it ships."},
    {ref:"sh|SH5", reason:"For Shopping, this is almost always a Merchant Center feed issue — check the diagnostics page."}
  ]},
  {id:"qs-dropped", label:"Quality Score dropped", causes:[
    {ref:"se|SE3", reason:"Diagnose the three QS components individually rather than reacting to the score itself."},
    {ref:"se|SE5", reason:"Thin RSA coverage limits the algorithm's ability to find and reinforce a high-relevance ad."}
  ]}
];

/* ================= WORKED CASE FILES ================= */
const CASES = [
  {
    id:"case-cpa-doubled", cat:"se", client:"A mid-market SaaS account", title:"The Account Where CPA Doubled in Three Weeks",
    teaser:"CPA climbed from $85 to $172 with CTR holding steady — the obvious suspects didn't check out.",
    data:[
      {metric:"CPA", before:"$85", after:"$172"},
      {metric:"CTR", before:"3.1%", after:"3.0%"},
      {metric:"CVR", before:"5.5%", after:"2.6%"},
      {metric:"Impression Share (lost to rank)", before:"8%", after:"9%"},
      {metric:"Landing page LCP", before:"1.9s", after:"4.6s"}
    ],
    causes:[
      {id:"a", title:"Bid strategy needs retuning", body:"Target CPA is set too aggressively for current auction pressure.", correct:false, verdict:"Ruled out — CTR held steady, which wouldn't be the pattern for a pure bid-pressure problem."},
      {id:"b", title:"A site change broke page speed, dragging Quality Score and CVR down", body:"CTR is flat, meaning the ad itself is still relevant. But CVR nearly halved, and Core Web Vitals data shows LCP jumped from 1.9s to 4.6s — consistent with a recent site redesign.", correct:true, verdict:"Correct — flat CTR with collapsing CVR and a matching LCP regression points squarely at a landing-page performance problem, not an ad or bid problem."},
      {id:"c", title:"A new competitor entered the auction", body:"Rising competition is pushing costs up across the board.", correct:false, verdict:"Ruled out — impression share lost to rank barely moved, which would be the expected signature of new competitive pressure."}
    ],
    fixes:["Roll back or optimize the landing page template to restore load time under 2.5s LCP.", "Re-run the QS component check post-fix to confirm relevance and landing-page experience both recover.", "Hold bid strategy unchanged until CVR recovers — don't compound the problem with a bid change."],
    rewrite:"What happened: a site redesign three weeks ago silently regressed landing page load time (LCP 1.9s → 4.6s). CTR held steady because the ads themselves were unaffected, but conversion rate nearly halved as more visitors bounced before the page finished loading — and Quality Score's landing-page-experience component degraded with it, pushing CPCs up on top of the conversion drop. Combined, CPA roughly doubled.\n\nFix shipped: the product team rolled back an unoptimized hero video that had been added to the landing page, restoring LCP to 2.1s. CPA returned to $91 within nine days — no bid or budget changes were needed."
  },
  {
    id:"case-meta-frequency", cat:"ps", client:"A DTC apparel brand", title:"The Meta Account With Rising Frequency",
    teaser:"Frequency climbed from 1.8 to 5.2 in a month while ROAS quietly slid — the retargeting pool had gone stale.",
    data:[
      {metric:"Frequency", before:"1.8", after:"5.2"},
      {metric:"CPM", before:"$14.20", after:"$14.80"},
      {metric:"CTR (link)", before:"1.4%", after:"0.6%"},
      {metric:"ROAS", before:"4.1x", after:"2.3x"},
      {metric:"Retargeting pool size", before:"38,000", after:"9,500"}
    ],
    causes:[
      {id:"a", title:"CPMs rose due to seasonal competition", body:"Holiday-adjacent competition is bidding up the auction.", correct:false, verdict:"Ruled out — CPM barely moved (+4%), which doesn't match the scale of the CTR and ROAS collapse."},
      {id:"b", title:"The retargeting pool shrank and the same creative kept serving to an exhausted audience", body:"Pool size dropped from 38,000 to 9,500 as the retargeting window wasn't refreshed, and the same single creative had been running the whole time — frequency climbed because a smaller pool absorbed the same budget.", correct:true, verdict:"Correct — a shrinking pool with unchanged spend and unchanged creative is the exact mechanism that drives frequency up and CTR/ROAS down together."},
      {id:"c", title:"Pixel tracking broke, undercounting conversions", body:"A tracking issue is making ROAS look worse than it actually is.", correct:false, verdict:"Ruled out — CTR also collapsed, which a pure tracking issue wouldn't explain; the audience itself is genuinely fatigued."}
    ],
    fixes:["Widen the retargeting window (add a 30-day site-visitor layer) to rebuild pool size.", "Ship at least 3 new creative concepts to break the fatigue cycle immediately.", "Set a frequency cap and a defined refresh cadence going forward so this doesn't recur silently."],
    rewrite:"What happened: the retargeting audience definition wasn't refreshed as the underlying site-visitor pool naturally shrank over the month, dropping from 38,000 to 9,500 people. The campaign's budget stayed level, so the same shrinking group saw the same single ad far more often — frequency nearly tripled. CTR and ROAS both slid as the audience became genuinely fatigued on that one creative.\n\nFix shipped: widened the audience to include a 30-day visitor window (from 14-day), and launched three new creative concepts on a staggered rotation. Frequency dropped back to 2.4 within two weeks and ROAS recovered to 3.8x."
  },
  {
    id:"case-shopping-feed", cat:"sh", client:"A home-goods ecommerce retailer", title:"The Shopping Feed That Lost Impression Share Overnight",
    teaser:"Impression share dropped from 68% to 22% in two days — the feed had been silently disapproved.",
    data:[
      {metric:"Shopping impression share", before:"68%", after:"22%"},
      {metric:"Active products in feed", before:"4,200", after:"3,050"},
      {metric:"Spend", before:"$1,840/day", after:"$610/day"},
      {metric:"Merchant Center disapprovals", before:"12", after:"1,150"},
      {metric:"ROAS on remaining products", before:"5.2x", after:"5.4x"}
    ],
    causes:[
      {id:"a", title:"A bid strategy change reduced spend", body:"Someone lowered the Target ROAS, pulling back delivery.", correct:false, verdict:"Ruled out — ROAS on the remaining products held steady, which wouldn't be the pattern from a bid change; this is a supply problem, not a demand problem."},
      {id:"b", title:"A catalog migration broke GTIN fields on 1,150 products, triggering mass disapproval", body:"Active product count dropped by over 1,100 exactly as disapprovals spiked by the same number — a data feed problem removed those products from the auction entirely.", correct:true, verdict:"Correct — the disapproval count and the missing-product count match almost exactly, and steady ROAS on what's left confirms the surviving products are performing normally. This is a feed integrity issue, not a performance issue."},
      {id:"c", title:"Seasonal demand dropped for this category", body:"Fewer shoppers are searching this time of year.", correct:false, verdict:"Ruled out — the drop happened in two days, far too fast to be explained by a seasonal demand shift."}
    ],
    fixes:["Pull the Merchant Center diagnostics report immediately to confirm the exact disapproval reason.", "Fix the GTIN field mapping from the new catalog system and resubmit the feed.", "Add a feed-health check to the weekly review cadence so a future migration doesn't go undetected this long."],
    rewrite:"What happened: a backend catalog migration two days ago dropped the GTIN field from over 1,100 SKUs during the data transfer. Google requires GTINs for most Shopping categories, so those products were mass-disapproved and pulled from the auction — impression share collapsed because there was simply less eligible inventory to show, not because of any performance problem.\n\nFix shipped: engineering restored the GTIN mapping in the feed export and resubmitted; Merchant Center re-approved the affected products within 24 hours of resubmission. Impression share recovered to 64% within four days."
  },
  {
    id:"case-broad-match-handoff", cat:"se", client:"An inherited legal-services account", title:"The Agency Handoff With Broad Match Everywhere",
    teaser:"CPA ran 3x the industry benchmark on an inherited account — the keyword structure had never been built with intent in mind.",
    data:[
      {metric:"CPA (this account)", before:"—", after:"$210"},
      {metric:"Industry benchmark CPA", before:"—", after:"$70"},
      {metric:"Match type mix", before:"—", after:"100% broad"},
      {metric:"Negative keyword list", before:"—", after:"Empty"},
      {metric:"Spend concentration", before:"—", after:"5 keywords = 80% of spend"}
    ],
    causes:[
      {id:"a", title:"The vertical is simply expensive", body:"Legal services has high CPCs across the board, so this is expected.", correct:false, verdict:"Ruled out — high CPCs alone don't explain 3x the benchmark; the structural issues explain the gap more directly."},
      {id:"b", title:"No match-type or negative-keyword discipline was ever established", body:"100% broad match with an empty negative list on five keywords carrying 80% of spend means the account has been paying for whatever loosely-related searches Google decided to match — with nothing filtering out low-intent traffic.", correct:true, verdict:"Correct — this is the textbook signature of an account that was set up once and never structurally maintained. The fix is foundational, not a bid tweak."},
      {id:"c", title:"The landing page needs a redesign", body:"Conversion rate on the page is the bottleneck.", correct:false, verdict:"Ruled out — with 100% broad match and no negatives, a large share of the traffic reaching that page was never a qualified visitor to begin with; fixing the page first would optimize for the wrong audience."}
    ],
    fixes:["Build a negative keyword list from six months of search-term history before touching anything else.", "Restructure the top five keywords into tightly themed ad groups with appropriate match types.", "Hold reporting expectations for 2-3 weeks while the structural changes take effect — this won't fix overnight."],
    rewrite:"What happened: the account was set up years ago on 100% broad match with no negative keyword list ever built, and spend concentrated in five keywords with no tiering by intent. This isn't a bid or creative problem — it's a foundational structure that was never established, common in accounts inherited from a prior agency or an in-house team without dedicated PPC ownership.\n\nFix shipped: built a negative list from six months of search-term data (mostly job-seeker and DIY-legal-form queries), restructured the top keywords into exact/phrase tiers with dedicated ad groups. CPA dropped from $210 to $95 over three weeks as the structural changes took hold, with further improvement expected as data accumulates."
  },
  {
    id:"case-retargeting-dry", cat:"dr", client:"A B2B software trial funnel", title:"The Retargeting Pool That Ran Dry",
    teaser:"CPMs climbed steadily for a month while conversions flattened — the retargeting window was too narrow to sustain the audience.",
    data:[
      {metric:"CPM", before:"$8.40", after:"$19.60"},
      {metric:"Retargeting pool size", before:"6,200", after:"1,100"},
      {metric:"Conversions/week", before:"34", after:"31"},
      {metric:"Retargeting window", before:"1 day", after:"1 day"},
      {metric:"Frequency", before:"2.9", after:"9.1"}
    ],
    causes:[
      {id:"a", title:"The offer stopped resonating with the audience", body:"Messaging fatigue is reducing conversion rate.", correct:false, verdict:"Ruled out — conversions/week held roughly flat, and the core problem shown in the data is rising cost, not falling conversion quality."},
      {id:"b", title:"A 1-day retargeting window is too narrow to sustain enough inventory, so the same shrinking pool gets bid up repeatedly", body:"Pool size collapsed from 6,200 to 1,100 while the window stayed fixed at 1 day. With such a narrow window, the pool depends entirely on fresh daily traffic — as soon as top-of-funnel traffic softened even slightly, the retargeting pool couldn't refill fast enough, and frequency more than tripled bidding for the same shrinking group.", correct:true, verdict:"Correct — a fixed 1-day window combined with a collapsing pool size and tripling frequency is the specific signature of an inventory-starved retargeting campaign, not a creative or offer problem."},
      {id:"c", title:"A competitor is now bidding on the same retargeting inventory", body:"Increased competition in the display auction is driving CPMs up.", correct:false, verdict:"Ruled out — the pool-size and frequency data point directly at an internal inventory constraint; competitive pressure wouldn't explain the pool shrinking specifically."}
    ],
    fixes:["Widen the retargeting window to 7 or 14 days to rebuild sustainable pool depth.", "Layer in a broader \"engaged visitor\" segment (2+ page views) rather than relying on a single narrow definition.", "Set a frequency ceiling so the campaign backs off automatically if pool depth drops again."],
    rewrite:"What happened: the retargeting campaign was scoped to a 1-day window from day one — fine when top-of-funnel traffic was strong, but as soon as traffic softened slightly, the pool couldn't refill fast enough. The same small, shrinking group of users kept getting shown ads at rising frequency, which is why CPMs climbed even though nothing about the creative or offer changed.\n\nFix shipped: widened the window to 14 days and added a secondary engaged-visitor segment to diversify the pool. CPMs settled back to $9.80 within ten days, and frequency dropped to 3.4."
  }
];

/* ================= SHARED STATE ================= */
const state = { selected: new Set(), plan: {} };
function toggleSelect(key, forceState){
  const has = state.selected.has(key);
  const next = forceState === undefined ? !has : forceState;
  if (next) state.selected.add(key); else state.selected.delete(key);
  updateSelIndicator();
  renderCurrentTab();
  broadcastPlan();
}
function planGoalBucket(tags){
  tags = tags || [];
  if (tags.indexOf('dataquality')>-1) return 'dataquality';
  if (tags.indexOf('brand')>-1 || tags.indexOf('awareness')>-1) return 'awareness,brand';
  if (tags.indexOf('leadgen')>-1) return 'leadgen,conversion';
  if (tags.indexOf('efficiency')>-1 || tags.indexOf('conversion')>-1) return 'efficiency,conversion';
  return null;
}
function broadcastPlan(){
  if (window.parent === window) return;
  const items = Array.from(state.selected).map(key => {
    const c = findCheck(key);
    if (!c) return null;
    return {
      label: c.code + ' — ' + c.name,
      note: (CATEGORIES[c.cat] ? CATEGORIES[c.cat].short : c.cat) + ' check',
      goal: planGoalBucket(c.tags)
    };
  }).filter(Boolean);
  window.parent.postMessage({
    type: 'practice-plan-sync', practice: 'paidmedia', practiceName: 'Paid Media Console', color: '--p-paidmedia', items: items
  }, '*');
}
function updateSelIndicator(){
  const n = state.selected.size;
  const ind = document.getElementById('sel-indicator');
  document.getElementById('sel-count-mini').textContent = n;
  ind.classList.toggle('empty', n===0);
}
function addBtnHTML(key){
  const added = state.selected.has(key);
  return `<button type="button" class="addbtn ${added?'added':''}" data-selkey="${key}">${added?'✓ Added':'+ Plan'}</button>`;
}
function wireAddBtns(root){
  root.querySelectorAll('[data-selkey]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); toggleSelect(btn.dataset.selkey); });
  });
}

/* ================= TAB SWITCHING ================= */
const TABS = ["index","pacing","diag","plan","workbench","readout"];
let currentTab = "index";
function switchTab(tab){
  currentTab = tab;
  TABS.forEach(t=>{
    document.getElementById('panel-'+t).style.display = (t===tab) ? '' : 'none';
    document.querySelector(`.tab-btn[data-tab="${t}"]`).classList.toggle('active', t===tab);
  });
  renderCurrentTab();
}
function renderCurrentTab(){
  if (currentTab==="index") renderIndex();
  else if (currentTab==="diag") renderDiagBody();
  else if (currentTab==="plan") renderPlan();
}
document.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
document.getElementById('goto-plan-btn').addEventListener('click', ()=>switchTab('plan'));

/* ================= INDEX ================= */
function buildIndexChips(){
  const catGroup = document.getElementById('index-cat-group');
  Object.entries(CATEGORIES).forEach(([key,meta])=>{
    const b = document.createElement('button');
    b.className='chip active'; b.dataset.cat=key; b.textContent=meta.short;
    b.style.setProperty('--cat-c', `var(--cat-${key})`);
    b.addEventListener('click',()=>{ b.classList.toggle('active'); renderIndex(); });
    catGroup.appendChild(b);
  });
  const tagGroup = document.getElementById('index-tag-group');
  Object.entries(TAGS).forEach(([key,label])=>{
    const b = document.createElement('button');
    b.className='chip tagchip'; b.dataset.tag=key; b.textContent=label;
    b.addEventListener('click',()=>{ b.classList.toggle('active'); renderIndex(); });
    tagGroup.appendChild(b);
  });
}
function activeSet(selector){
  return new Set(Array.from(document.querySelectorAll(selector+'.active')).map(el=>el.dataset.cat||el.dataset.tag));
}
function bandsHTML(c){
  return `<div class="bench-bands">
    <div class="band" style="--band-c:var(--sig-watch)"><span class="band-tag">Red flag</span><span class="band-val">${c.red}</span></div>
    <div class="band" style="--band-c:var(--sig-typical)"><span class="band-tag">Common</span><span class="band-val">${c.common}</span></div>
    <div class="band" style="--band-c:var(--sig-strong)"><span class="band-tag">Best practice</span><span class="band-val">${c.best_practice}</span></div>
  </div>`;
}
function renderIndex(){
  const q = document.getElementById('index-search').value.trim().toLowerCase();
  const cats = activeSet('#index-cat-group .chip');
  const tags = activeSet('#index-tag-group .chip');
  const results = document.getElementById('index-results');
  if (!cats.size){
    document.getElementById('index-count-badge').textContent = '0 of '+CHECKS.length;
    results.innerHTML = '<div class="empty-state">Select a surface above to see its heuristics.</div>';
    return;
  }
  const filtered = CHECKS.filter(c=>{
    if (cats.size && !cats.has(c.cat)) return false;
    if (tags.size && !c.tags.some(t=>tags.has(t))) return false;
    if (q){ const hay=(c.code+' '+c.name+' '+c.def+' '+c.best).toLowerCase(); if (!hay.includes(q)) return false; }
    return true;
  });
  document.getElementById('index-count-badge').textContent = filtered.length+' of '+CHECKS.length;
  results.innerHTML='';
  if (!filtered.length){ results.innerHTML='<div class="empty-state">No heuristics match those filters. Try clearing a filter or broadening the search.</div>'; return; }
  Object.entries(CATEGORIES).forEach(([key,meta])=>{
    const items = filtered.filter(c=>c.cat===key);
    if (!items.length) return;
    const section = document.createElement('section');
    section.className='section';
    section.innerHTML = `
      <div class="section-head" style="--sec-c:var(--cat-${key})"><span class="dot"></span><h2>${meta.label}</h2><span class="sec-count">${items.length} check${items.length===1?'':'s'}</span></div>
      <div class="grid">${items.map(c=>`
        <div class="card-flip" style="--card-c:var(--cat-${key})">
          <div class="card-flip-inner">
            <article class="card card-face front">
              <div class="card-head">
                <div><div class="acronym font-mono">${c.code}</div><h3 class="kpi-name">${c.name}</h3></div>
                ${addBtnHTML(ckey(c))}
              </div>
              <p class="definition">${c.def}</p>
              <div class="example"><b>Example</b><span>${c.ex}</span></div>
              <p class="best-when"><b>Matters most when:</b> ${c.best}</p>
              <div class="tagrow">${c.tags.map(t=>`<span class="tag">${TAGS[t]}</span>`).join('')}</div>
              <button type="button" class="card-bench-btn" data-action="flip">What good looks like →</button>
            </article>
            <article class="card card-face back">
              <div class="card-head">
                <div><div class="acronym font-mono">${c.code}</div><h3 class="kpi-name">${c.name}</h3></div>
              </div>
              <p class="bench-label">Where does this account fall?</p>
              ${bandsHTML(c)}
              <button type="button" class="card-bench-btn" data-action="flip">← Back</button>
            </article>
          </div>
        </div>`).join('')}</div>`;
    results.appendChild(section);
  });
  wireAddBtns(results);
  results.querySelectorAll('[data-action="flip"]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); btn.closest('.card-flip').classList.toggle('flipped'); });
  });
}
document.getElementById('index-search').addEventListener('input', renderIndex);
document.getElementById('index-clear').addEventListener('click', ()=>{
  document.querySelectorAll('#panel-index .chip').forEach(c=>c.classList.remove('active'));
  document.querySelectorAll('#index-cat-group .chip').forEach(c=>c.classList.add('active'));
  document.getElementById('index-search').value=''; renderIndex();
});

/* ================= PACING CALCULATOR ================= */
function fmtCurrency(n){ return "$" + n.toLocaleString(undefined,{maximumFractionDigits:0}); }
function fmtPct(n){ return (n>=0?"+":"") + n.toFixed(1) + "%"; }
function calcPacing(){
  const client = document.getElementById('pc-client').value.trim() || 'this engagement';
  const daysInMonth = parseFloat(document.getElementById('pc-days-in-month').value);
  const monthlyBudget = parseFloat(document.getElementById('pc-monthly-budget').value);
  const daysElapsed = parseFloat(document.getElementById('pc-days-elapsed').value);
  const spendToDate = parseFloat(document.getElementById('pc-spend-to-date').value);
  const targetType = document.getElementById('pc-target-type').value;
  const targetValue = parseFloat(document.getElementById('pc-target-value').value);
  const currentValue = parseFloat(document.getElementById('pc-current-value').value);

  if ([daysInMonth,monthlyBudget,daysElapsed,spendToDate,targetValue,currentValue].some(v=>isNaN(v)) || daysElapsed<=0 || daysInMonth<=0){
    alert('Fill in all fields with valid numbers before calculating.');
    return;
  }

  const dailyBudgetTarget = monthlyBudget / daysInMonth;
  const expectedSpendToDate = dailyBudgetTarget * daysElapsed;
  const paceVariancePct = expectedSpendToDate === 0 ? 0 : ((spendToDate - expectedSpendToDate) / expectedSpendToDate) * 100;
  const projectedEOMSpend = (spendToDate / daysElapsed) * daysInMonth;
  const projectedVsBudgetPct = ((projectedEOMSpend - monthlyBudget) / monthlyBudget) * 100;
  const daysRemaining = Math.max(daysInMonth - daysElapsed, 0.0001);
  const remainingBudget = monthlyBudget - spendToDate;
  const recommendedDailyBudget = remainingBudget / daysRemaining;

  let paceStatus, paceClass;
  if (paceVariancePct > 10){ paceStatus = 'Overpacing'; paceClass = 'watch'; }
  else if (paceVariancePct < -10){ paceStatus = 'Underpacing'; paceClass = 'watch'; }
  else { paceStatus = 'On pace'; paceClass = 'strong'; }

  const higherIsBetter = targetType === 'roas';
  const performanceGap = higherIsBetter ? ((currentValue - targetValue) / targetValue) * 100 : ((targetValue - currentValue) / targetValue) * 100;
  let perfStatus, perfClass;
  if (performanceGap >= -5){ perfStatus = higherIsBetter ? 'Meeting or beating target' : 'Meeting or beating target'; perfClass = 'strong'; }
  else if (performanceGap >= -20){ perfStatus = 'Slightly off target'; perfClass = 'typical'; }
  else { perfStatus = 'Materially off target'; perfClass = 'watch'; }

  const targetLabel = targetType === 'roas' ? 'ROAS' : 'CPA';
  const currentFmt = targetType === 'roas' ? currentValue.toFixed(2)+'x' : fmtCurrency(currentValue);
  const targetFmt = targetType === 'roas' ? targetValue.toFixed(2)+'x' : fmtCurrency(targetValue);

  let recommendation = '';
  if (paceStatus === 'Overpacing' && perfClass === 'watch'){
    recommendation = `${client} is spending faster than the budget curve supports while also missing its ${targetLabel} target. Recommend cutting the recommended daily budget to ${fmtCurrency(recommendedDailyBudget)}/day and pausing lowest-efficiency segments until performance recovers before restoring pace.`;
  } else if (paceStatus === 'Overpacing'){
    recommendation = `${client} is on track to overspend the monthly budget by ${fmtPct(projectedVsBudgetPct)} at the current rate, though ${targetLabel} performance is healthy. Recommend tightening daily budget to ${fmtCurrency(recommendedDailyBudget)}/day for the rest of the month to land on target.`;
  } else if (paceStatus === 'Underpacing' && perfClass !== 'watch'){
    recommendation = `${client} is underpacing by ${fmtPct(Math.abs(paceVariancePct))} against the budget curve despite healthy ${targetLabel} performance — there's room to spend more. Recommend raising daily budget toward ${fmtCurrency(recommendedDailyBudget)}/day to capture more volume at the current efficiency.`;
  } else if (paceStatus === 'Underpacing'){
    recommendation = `${client} is both underpacing and missing its ${targetLabel} target — the shortfall in spend isn't a symptom of restraint, it's a symptom of an efficiency problem limiting how much budget can be spent well. Fix the underlying performance issue before increasing budget.`;
  } else if (perfClass === 'watch'){
    recommendation = `${client}'s pacing is healthy, but ${targetLabel} performance is materially off target at ${currentFmt} vs. a ${targetFmt} goal. This is a performance problem, not a pacing problem — check the Diagnostics tab for likely root causes.`;
  } else {
    recommendation = `${client} is on pace and meeting its ${targetLabel} target. No pacing or bid-strategy intervention needed this period — hold course and re-check at the next review.`;
  }

  const result = document.getElementById('pc-result');
  result.innerHTML = `
    <div class="pacing-result">
      <div class="pacing-status-row">
        <span class="pacing-pill ${paceClass}">${paceStatus} (${fmtPct(paceVariancePct)} vs. curve)</span>
        <span class="pacing-pill ${perfClass}">${perfStatus}</span>
      </div>
      <div class="pacing-metrics">
        <div class="pacing-metric"><span class="k">Daily budget target</span><span class="v font-mono">${fmtCurrency(dailyBudgetTarget)}</span></div>
        <div class="pacing-metric"><span class="k">Expected spend to date</span><span class="v font-mono">${fmtCurrency(expectedSpendToDate)}</span></div>
        <div class="pacing-metric"><span class="k">Actual spend to date</span><span class="v font-mono">${fmtCurrency(spendToDate)}</span></div>
        <div class="pacing-metric"><span class="k">Projected EOM spend</span><span class="v font-mono">${fmtCurrency(projectedEOMSpend)} (${fmtPct(projectedVsBudgetPct)} vs. budget)</span></div>
        <div class="pacing-metric"><span class="k">Recommended remaining daily budget</span><span class="v font-mono">${fmtCurrency(recommendedDailyBudget)}</span></div>
        <div class="pacing-metric"><span class="k">${targetLabel}: current vs. target</span><span class="v font-mono">${currentFmt} / ${targetFmt}</span></div>
      </div>
      <p class="pacing-note">${recommendation}</p>
    </div>`;
  result.style.display = '';
  result.scrollIntoView({behavior:'smooth', block:'nearest'});
}
document.getElementById('pc-calc-btn').addEventListener('click', calcPacing);
document.getElementById('pc-reset-btn').addEventListener('click', ()=>{
  ['pc-client','pc-monthly-budget','pc-days-elapsed','pc-spend-to-date','pc-target-value','pc-current-value'].forEach(id=>{ document.getElementById(id).value=''; });
  document.getElementById('pc-days-in-month').value = 30;
  document.getElementById('pc-target-type').value = 'cpa';
  document.getElementById('pc-result').style.display = 'none';
});

/* ================= DIAGNOSTICS: subnav ================= */
document.querySelectorAll('.diag-subnav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.diag-subnav-btn').forEach(b=>b.classList.toggle('active', b===btn));
    document.getElementById('diag-sub-quick').style.display = btn.dataset.sub==='quick' ? '' : 'none';
    document.getElementById('diag-sub-cases').style.display = btn.dataset.sub==='cases' ? '' : 'none';
  });
});

/* ================= DIAGNOSTICS: quick lookup ================= */
let diagSelectedId = null;
function renderDiagBody(){
  const body = document.getElementById('diag-body');
  if (!diagSelectedId){ body.innerHTML = '<div class="empty-state">Search for a symptom above to see what to check next.</div>'; return; }
  const sym = SYMPTOMS.find(s=>s.id===diagSelectedId);
  if (!sym){ body.innerHTML = '<div class="empty-state">Search for a symptom above to see what to check next.</div>'; return; }
  body.innerHTML = `
    <div class="diag-current"><span class="nm">${sym.label}</span></div>
    <p class="best-when" style="margin-bottom:4px;">Check these next:</p>
    <div class="diag-list">${sym.causes.map(item=>{
      const c = findCheck(item.ref);
      if (!c) return '';
      return `<div class="diag-item" style="--card-c:var(--cat-${c.cat})">
        <div class="body">
          <div class="head"><span class="acr">${c.code}</span><span class="nm">${c.name}</span></div>
          <p class="reason">${item.reason}</p>
        </div>
        ${addBtnHTML(ckey(c))}
      </div>`;
    }).join('')}</div>`;
  wireAddBtns(body);
}
const diagSearchInput = document.getElementById('diag-search');
const diagResultsList = document.getElementById('diag-search-results');
diagSearchInput.addEventListener('input', ()=>{
  const q = diagSearchInput.value.trim().toLowerCase();
  if (!q){ diagResultsList.style.display='none'; diagResultsList.innerHTML=''; return; }
  const matches = SYMPTOMS.filter(s=>s.label.toLowerCase().includes(q)).slice(0,10);
  if (!matches.length){ diagResultsList.style.display='none'; diagResultsList.innerHTML=''; return; }
  diagResultsList.innerHTML = matches.map(s=>`<button type="button" data-symid="${s.id}">${s.label}</button>`).join('');
  diagResultsList.style.display='';
  diagResultsList.querySelectorAll('button').forEach(b=>b.addEventListener('click', ()=>{
    diagSelectedId = b.dataset.symid;
    diagSearchInput.value = SYMPTOMS.find(s=>s.id===diagSelectedId).label;
    diagResultsList.style.display='none';
    renderDiagBody();
  }));
});
document.addEventListener('click', (e)=>{ if (!e.target.closest('.diag-search')) diagResultsList.style.display='none'; });

/* ================= DIAGNOSTICS: case files ================= */
const CASE_STAGES = ["Data","Diagnose","Recommend","Rewrite"];
let activeCaseId = null;
let activeCaseStage = 0;
let revealedCauseId = null;

function renderCaseGrid(){
  const grid = document.getElementById('case-grid');
  grid.innerHTML = CASES.map(c=>`
    <button type="button" class="case-card" data-case="${c.id}" style="--cat-c:var(--cat-${c.cat})">
      <div class="case-top"><span class="case-chan-chip">${CATEGORIES[c.cat].short}</span></div>
      <h3 class="case-title">${c.title}</h3>
      <p class="case-client">${c.client}</p>
      <p class="case-teaser">${c.teaser}</p>
    </button>`).join('');
  grid.querySelectorAll('[data-case]').forEach(btn=>{
    btn.addEventListener('click', ()=>openCase(btn.dataset.case));
  });
}
function openCase(id){
  activeCaseId = id; activeCaseStage = 0; revealedCauseId = null;
  document.getElementById('case-workspace').style.display = '';
  document.getElementById('case-bar-title').textContent = CASES.find(c=>c.id===id).title;
  document.querySelectorAll('.case-card').forEach(c=>c.classList.toggle('active', c.dataset.case===id));
  renderStepper();
  renderStage();
  document.getElementById('case-workspace').scrollIntoView({behavior:'smooth', block:'start'});
}
document.getElementById('case-change-btn').addEventListener('click', ()=>{
  document.getElementById('case-workspace').style.display = 'none';
  document.querySelectorAll('.case-card').forEach(c=>c.classList.remove('active'));
});
function renderStepper(){
  const el = document.getElementById('case-stepper');
  el.innerHTML = CASE_STAGES.map((label,i)=>{
    const node = `<button type="button" class="step-node ${i===activeCaseStage?'active':(i<activeCaseStage?'done':'')}" data-stage="${i}"><span class="dot">${i+1}</span><span class="lbl">${label}</span></button>`;
    return node + (i<CASE_STAGES.length-1 ? '<div class="step-line"></div>' : '');
  }).join('');
  el.querySelectorAll('[data-stage]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ activeCaseStage = parseInt(btn.dataset.stage,10); renderStepper(); renderStage(); });
  });
}
function renderStage(){
  const c = CASES.find(x=>x.id===activeCaseId);
  const panel = document.getElementById('case-stage-panel');
  if (activeCaseStage === 0){
    panel.innerHTML = `
      <div class="stage-head"><h2>1. Data</h2><p>Here's what showed up in the account. Review it, then move to Diagnose.</p></div>
      <div class="tbl-scroll"><table class="data-table"><thead><tr><th>Metric</th><th>Before</th><th>After</th></tr></thead>
        <tbody>${c.data.map(r=>`<tr><td>${r.metric}</td><td class="num">${r.before}</td><td class="num">${r.after}</td></tr>`).join('')}</tbody>
      </table></div>
      <div class="stage-actions"><span></span><button type="button" class="btn-primary" data-next="1">Next: Diagnose →</button></div>`;
  } else if (activeCaseStage === 1){
    panel.innerHTML = `
      <div class="stage-head"><h2>2. Diagnose</h2><p>Pick the cause you think the evidence supports. Each option reveals whether it holds up.</p></div>
      <div class="cause-grid">${c.causes.map(cause=>`
        <button type="button" class="cause-card ${cause.correct?'correct':'wrong'} ${revealedCauseId?'revealed':''}" data-cause="${cause.id}">
          <div class="cc-title">${cause.title}</div>
          <div class="cc-body">${cause.body}</div>
          <div class="cc-verdict">${cause.correct?'✓ ':'✗ '}${cause.verdict}</div>
        </button>`).join('')}</div>
      <div class="stage-actions"><span></span><button type="button" class="btn-primary" data-next="2" ${revealedCauseId?'':'disabled'}>Next: Recommend →</button></div>`;
    panel.querySelectorAll('[data-cause]').forEach(btn=>{
      btn.addEventListener('click', ()=>{ revealedCauseId = btn.dataset.cause; renderStage(); });
    });
  } else if (activeCaseStage === 2){
    panel.innerHTML = `
      <div class="stage-head"><h2>3. Recommend</h2><p>Given the confirmed cause, here's what ships next.</p></div>
      <ul class="fix-list">${c.fixes.map(f=>`<li>${f}</li>`).join('')}</ul>
      <div class="stage-actions"><span></span><button type="button" class="btn-primary" data-next="3">Next: Rewrite →</button></div>`;
  } else {
    panel.innerHTML = `
      <div class="stage-head"><h2>4. Rewrite</h2><p>The fix, written the way it would actually be reported to the client.</p></div>
      <div class="rewrite-box">${c.rewrite}</div>
      <div class="stage-actions"><span></span><button type="button" class="btn-secondary" id="case-restart-btn">Start over</button></div>`;
    const restart = document.getElementById('case-restart-btn');
    if (restart) restart.addEventListener('click', ()=>{ activeCaseStage=0; revealedCauseId=null; renderStepper(); renderStage(); });
  }
  panel.querySelectorAll('[data-next]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ activeCaseStage = parseInt(btn.dataset.next,10); renderStepper(); renderStage(); });
  });
}
renderCaseGrid();

/* ================= PLAN ================= */
const CADENCE_OPTS = ["Weekly","Monthly","Quarterly","Ad hoc"];
function planFieldsFor(key){
  if (!state.plan[key]) state.plan[key] = {cadence:"Monthly", owner:"", target:""};
  return state.plan[key];
}
function renderPlan(){
  const hasSel = state.selected.size>0;
  document.getElementById('plan-empty').style.display = hasSel ? 'none' : '';
  document.getElementById('plan-body').style.display = hasSel ? '' : 'none';
  if (!hasSel) return;
  document.getElementById('plan-client-echo').value = 'Untitled engagement';
  document.getElementById('plan-industry-echo').value = 'Not specified';
  document.getElementById('plan-goal-echo').value = 'Not specified';

  const sections = document.getElementById('plan-sections');
  sections.innerHTML='';
  Object.entries(CATEGORIES).forEach(([catKey,meta])=>{
    const items = CHECKS.filter(c=>c.cat===catKey && state.selected.has(ckey(c)));
    if (!items.length) return;
    const section = document.createElement('div');
    section.className='section';
    const toolbarId = 'tb-'+catKey;
    section.innerHTML = `
      <div class="section-head" style="--sec-c:var(--cat-${catKey})"><span class="dot"></span><h3>${meta.label}</h3><span class="sec-count">${items.length} check${items.length===1?'':'s'}</span></div>
      <div class="plan-section-toolbar" id="${toolbarId}">
        <span>Apply to all in section:</span>
        <select data-field="cadence">${CADENCE_OPTS.map(c=>`<option value="${c}">${c}</option>`).join('')}</select>
        <input type="text" data-field="owner" placeholder="Owner">
        <input type="text" data-field="target" placeholder="Target / threshold">
        <button type="button" data-apply="${catKey}">Apply</button>
      </div>
      <div class="plan-scroll">
        <table class="plan-table">
          <thead><tr><th>Check</th><th>Cadence</th><th>Owner</th><th>Target / threshold</th></tr></thead>
          <tbody>${items.map(c=>{
            const f = planFieldsFor(ckey(c));
            return `<tr data-row="${ckey(c)}">
              <td class="kpiname"><span class="acr">${c.code}</span>${c.name}</td>
              <td><select data-field="cadence">${CADENCE_OPTS.map(opt=>`<option value="${opt}" ${f.cadence===opt?'selected':''}>${opt}</option>`).join('')}</select></td>
              <td><input type="text" data-field="owner" value="${f.owner.replace(/"/g,'&quot;')}" placeholder="e.g. A. Alicea"></td>
              <td><input type="text" data-field="target" value="${f.target.replace(/"/g,'&quot;')}" placeholder="e.g. QS ≥ 7"></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
    sections.appendChild(section);
  });

  sections.querySelectorAll('tbody tr').forEach(row=>{
    const key = row.dataset.row;
    row.querySelectorAll('[data-field]').forEach(el=>{
      el.addEventListener('input', ()=>{ planFieldsFor(key)[el.dataset.field] = el.value; });
      el.addEventListener('change', ()=>{ planFieldsFor(key)[el.dataset.field] = el.value; });
    });
  });
  sections.querySelectorAll('[data-apply]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const catKey = btn.dataset.apply;
      const toolbar = document.getElementById('tb-'+catKey);
      const vals = {};
      toolbar.querySelectorAll('[data-field]').forEach(el=>{ if(el.value) vals[el.dataset.field]=el.value; });
      CHECKS.filter(c=>c.cat===catKey && state.selected.has(ckey(c))).forEach(c=>{
        Object.assign(planFieldsFor(ckey(c)), vals);
      });
      renderPlan();
    });
  });
}

/* ================= WORKBENCH ================= */
const RANDOM_POOLS = {
  "": {
    biz:["Riverside Dental","Northgate HVAC","Bloom & Co. Florals","Summit Legal Group"],
    desc:["same-day appliance repair","a 30-day fitness challenge","custom closet installation","small business bookkeeping"],
    audience:["homeowners with an urgent repair","busy parents in the metro area","small business owners","first-time buyers"],
    benefit:["same-day service","a money-back guarantee","free consultations","no hidden fees"],
    proof:["4.9 stars from 1,200+ reviews","Trusted by 500+ local families","BBB A+ rated since 2011"],
    seeds:["local service","repair company","near me service"]
  },
  ecommerce: {
    biz:["Northshore Supply Co.","Kindred Goods","Amber & Oak"],
    desc:["handmade leather goods","organic skincare","sustainable home decor"],
    audience:["shoppers who care about quality over quantity","gift shoppers","eco-conscious buyers"],
    benefit:["free shipping over $50","30-day returns","limited holiday restock"],
    proof:["10,000+ five-star reviews","As seen in Real Simple"],
    seeds:["handmade gifts","organic skincare","sustainable home goods"]
  },
  b2b: {
    biz:["Ledgerline Analytics","Vantage Ops","Northwind Cloud"],
    desc:["automated invoice reconciliation software","a project management platform for agencies","B2B lead enrichment"],
    audience:["finance teams at mid-market companies","agency operations leads","RevOps teams"],
    benefit:["a 14-day free trial","white-glove onboarding","SOC 2 Type II compliance"],
    proof:["Trusted by 300+ finance teams","G2 rated 4.8/5"],
    seeds:["finance automation software","ops platform","B2B SaaS tool"]
  },
  local: {
    biz:["Maplewood Plumbing","City Line Auto Repair","Garden State HVAC"],
    desc:["emergency plumbing repair","same-day auto diagnostics","AC repair and installation"],
    audience:["homeowners with an urgent repair","drivers needing a fast diagnosis","families before a heat wave"],
    benefit:["24/7 emergency service","free estimates","licensed and insured techs"],
    proof:["4.9 stars, 800+ local reviews","Family-owned since 1998"],
    seeds:["emergency plumber","auto repair near me","AC repair"]
  },
  content: {
    biz:["The Weekly Signal","Fieldnotes Media","Compass Digest"],
    desc:["a weekly newsletter on marketing analytics","independent local news","a members-only research briefing"],
    audience:["marketing operators","local readers who want real reporting","research-minded subscribers"],
    benefit:["your first month free","ad-free reading","exclusive subscriber Q&As"],
    proof:["40,000+ subscribers","Featured in Digiday"],
    seeds:["marketing newsletter","local news subscription","industry briefing"]
  }
};
const TONE_MAP = {
  direct: {adj:"Straightforward"}, premium: {adj:"Premium"}, friendly: {adj:"Friendly"}, urgent: {adj:"Fast"}
};
const CTA_MAP = {
  leads: {verb:"Get a Free Quote", social:"Learn More"},
  sales: {verb:"Shop Now", social:"Shop Now"},
  calls: {verb:"Call Now", social:"Call Now"},
  signup: {verb:"Start Free Trial", social:"Sign Up"}
};
const INDUSTRY_LABEL = {ecommerce:"Ecommerce",b2b:"B2B",local:"Local Service",content:"Media",""	:"Industry"};
const NEG_BASE = ["free","jobs","salary","diy","how to"];

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function getRandomPool(){ const industry = document.getElementById("wb-industry").value; return RANDOM_POOLS[industry] || RANDOM_POOLS[""]; }
function randomizeField(target){
  const pool = getRandomPool();
  let val = "";
  if (target === "wb-biz") val = pickRandom(pool.biz);
  else if (target === "wb-desc") val = pickRandom(pool.desc);
  else if (target === "wb-audience") val = pickRandom(pool.audience);
  else if (target === "wb-benefit") val = pickRandom(pool.benefit);
  else if (target === "wb-proof") val = pickRandom(pool.proof);
  else if (target === "wb-seeds") val = pickRandom(pool.seeds);
  document.getElementById(target).value = val;
}
document.querySelectorAll('#panel-workbench .dice-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>randomizeField(btn.dataset.rand));
});

function cap(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
function truncateWords(str, max){
  str = str.trim();
  if (str.length <= max) return str;
  let cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  return cut.trim();
}
function dedupe(arr){ return [...new Set(arr.filter(Boolean))]; }
function esc(s){ const d=document.createElement("div"); d.textContent=s; return d.innerHTML; }

function readWbInputs(){
  const biz = document.getElementById("wb-biz").value.trim() || "Your Business";
  const industry = document.getElementById("wb-industry").value;
  const desc = document.getElementById("wb-desc").value.trim() || "our service";
  const audience = document.getElementById("wb-audience").value.trim() || "customers";
  const benefit = cap(document.getElementById("wb-benefit").value.trim()) || "Real results";
  const proof = document.getElementById("wb-proof").value.trim();
  const tone = document.getElementById("wb-tone").value;
  const goal = document.getElementById("wb-goal").value;
  const seeds = dedupe(document.getElementById("wb-seeds").value.split(",").map(s=>s.trim().toLowerCase()));
  return {biz, industry, desc, audience, benefit, proof, tone, goal, seeds};
}

function buildRsaHeadlines(ctx){
  const cta = CTA_MAP[ctx.goal].verb;
  let formulas = [
    ctx.biz, ctx.benefit, `${cap(ctx.desc)}`, `${cta}`, `Need ${ctx.desc}?`,
    `${ctx.biz}: ${cta}`, `Get ${ctx.benefit}`, `Top-Rated ${ctx.desc}`,
    `${cta} Today`, `Quality ${cap(ctx.desc)}`, `Trusted by ${cap(ctx.audience).split(' ').slice(-2).join(' ')}`,
    `${cap(ctx.desc)}, Made Easy`, `See Why We're #1`, `${ctx.benefit}. ${cta}.`
  ];
  if (ctx.proof) formulas.unshift(truncateWords(ctx.proof, 30));
  formulas = dedupe(formulas).filter(f=>f.length<=30);
  return formulas.slice(0,15);
}
function buildRsaDescriptions(ctx){
  const cta = CTA_MAP[ctx.goal].verb;
  let d = [
    `${ctx.benefit} at ${ctx.biz}. ${cta} today.`,
    ctx.proof ? `${ctx.proof}. ${cta} now — it only takes a minute.` : `${cap(ctx.audience)} trust ${ctx.biz} for ${ctx.desc}. ${cta} now.`,
    `${cap(ctx.desc)} built for ${ctx.audience}. ${ctx.benefit}. ${cta}.`,
    `Serving ${ctx.audience} with ${ctx.desc}. ${ctx.benefit} — ${cta.toLowerCase()}.`
  ];
  d = dedupe(d).filter(x=>x.length<=90);
  return d.slice(0,4);
}
function buildSocialCopy(ctx){
  const cta = CTA_MAP[ctx.goal];
  const primaryShort = truncateWords(`${ctx.benefit}. ${cta.social} today.`, 125);
  const primaryLong = truncateWords(
    `${ctx.biz} helps ${ctx.audience} get ${ctx.desc} without the hassle. ${ctx.benefit}` +
    (ctx.proof ? ` — ${ctx.proof.toLowerCase()}.` : ".") +
    ` ${cta.social} and see the difference.`, 280);
  const headline = truncateWords(`${ctx.biz}: ${ctx.benefit}`, 40);
  const linkDesc = truncateWords(`${cap(ctx.desc)} for ${ctx.audience}`, 50);
  return {primaryShort, primaryLong, headline, linkDesc, cta: cta.social};
}
function buildWbKeywords(ctx){
  const seeds = ctx.seeds.length ? ctx.seeds : [ctx.desc.toLowerCase()];
  const audNoun = ctx.audience.split(" ").slice(-2).join(" ").toLowerCase() || "customers";
  let broad=[], phrase=[], exact=[], neg=[];
  seeds.forEach(s=>{
    broad.push(`best ${s}`, `${s} near me`, `affordable ${s}`, `top ${s}`, `${s} company`);
    phrase.push(`"${s} cost"`, `"${s} reviews"`, `"${s} for ${audNoun}"`);
    exact.push(`[${s}]`, `[${s} near me]`, `[buy ${s}]`);
    neg.push(`${s} jobs`, `${s} salary`);
  });
  neg = NEG_BASE.concat(neg);
  return { broad: dedupe(broad).slice(0,8), phrase: dedupe(phrase).slice(0,6), exact: dedupe(exact).slice(0,6), neg: dedupe(neg).slice(0,10) };
}
function renderWorkbench(){
  const ctx = readWbInputs();
  const headlines = buildRsaHeadlines(ctx);
  const descs = buildRsaDescriptions(ctx);
  const social = buildSocialCopy(ctx);
  const kw = buildWbKeywords(ctx);

  document.getElementById("wb-stat-hl").textContent = headlines.length;
  document.getElementById("wb-stat-desc").textContent = descs.length;
  document.getElementById("wb-google-count").textContent = `${headlines.length} headlines · ${descs.length} descriptions`;

  const hlList = document.getElementById("wb-headline-list");
  hlList.innerHTML = headlines.map((h,i)=>`
    <div class="hl-row"><input type="text" value="${esc(h)}" data-idx="${i}" class="hl-input" /><span class="cc-badge font-mono">${h.length}/30</span></div>`).join("");
  hlList.querySelectorAll(".hl-input").forEach(inp=>{
    inp.addEventListener("input", ()=>{
      const badge = inp.parentElement.querySelector(".cc-badge");
      const len = inp.value.length;
      badge.textContent = `${len}/30`;
      badge.classList.toggle("over", len>30);
    });
  });

  const descList = document.getElementById("wb-desc-list");
  descList.innerHTML = descs.map(d=>`<div class="desc-card" style="--sec-c:var(--cat-se);"><span class="cc-badge font-mono" style="float:right;">${d.length}/90</span><div>${esc(d)}</div></div>`).join("");

  document.getElementById("wb-meta-count").textContent = `CTA: ${social.cta}`;
  document.getElementById("wb-meta-block").innerHTML = `
    <div class="meta-card" style="--sec-c:var(--cat-ps);"><span class="k">Primary text — short</span><div>${esc(social.primaryShort)}</div></div>
    <div class="meta-card" style="--sec-c:var(--cat-ps);"><span class="k">Primary text — long</span><div>${esc(social.primaryLong)}</div></div>
    <div class="meta-card" style="--sec-c:var(--cat-ps);"><span class="k">Headline (max 40)</span><div class="font-mono">${esc(social.headline)} <span class="cc-badge">${social.headline.length}/40</span></div></div>
    <div class="meta-card" style="--sec-c:var(--cat-ps);"><span class="k">Link description</span><div>${esc(social.linkDesc)}</div></div>
    <div class="meta-card" style="--sec-c:var(--cat-ps);"><span class="k">CTA button</span><div class="font-mono">${esc(social.cta)}</div></div>`;

  const total = kw.broad.length+kw.phrase.length+kw.exact.length+kw.neg.length;
  document.getElementById("wb-kw-count").textContent = `${total} terms across 4 groups`;
  document.getElementById("wb-kw-grid").innerHTML = `
    <div class="kw-group" style="--kw-c:var(--cat-se);"><h3>Broad match ideas <span class="n">${kw.broad.length}</span></h3><ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px;">${kw.broad.map(k=>`<li class="font-mono" style="font-size:0.8125rem;padding:5px 8px;background:var(--surface-2);border-radius:5px;">${esc(k)}</li>`).join("")}</ul></div>
    <div class="kw-group" style="--kw-c:var(--cat-se);"><h3>Phrase match ideas <span class="n">${kw.phrase.length}</span></h3><ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px;">${kw.phrase.map(k=>`<li class="font-mono" style="font-size:0.8125rem;padding:5px 8px;background:var(--surface-2);border-radius:5px;">${esc(k)}</li>`).join("")}</ul></div>
    <div class="kw-group" style="--kw-c:var(--cat-se);"><h3>Exact match ideas <span class="n">${kw.exact.length}</span></h3><ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px;">${kw.exact.map(k=>`<li class="font-mono" style="font-size:0.8125rem;padding:5px 8px;background:var(--surface-2);border-radius:5px;">${esc(k)}</li>`).join("")}</ul></div>
    <div class="kw-group" style="--kw-c:var(--sig-watch);"><h3>Starter negatives <span class="n">${kw.neg.length}</span></h3><ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px;">${kw.neg.map(k=>`<li class="font-mono" style="font-size:0.8125rem;padding:5px 8px;background:var(--surface-2);border-radius:5px;color:var(--sig-watch);">${esc(k)}</li>`).join("")}</ul></div>`;

  document.getElementById("wb-empty-note").style.display = "none";
  document.getElementById("wb-results").style.display = "block";
}
document.getElementById('wb-generate-btn').addEventListener('click', renderWorkbench);
document.getElementById('wb-reset-btn').addEventListener('click', ()=>{
  ['wb-biz','wb-desc','wb-audience','wb-benefit','wb-proof','wb-seeds'].forEach(id=>{ document.getElementById(id).value=''; });
  document.getElementById('wb-industry').value=''; document.getElementById('wb-tone').value='direct'; document.getElementById('wb-goal').value='leads';
  document.getElementById('wb-results').style.display='none';
  document.getElementById('wb-empty-note').style.display='';
});

/* ================= READOUT ================= */
const KPI_LIST = [
  {id:"cpa", name:"CPA", format:"currency", higherIsBetter:false, goodPhrase:"efficient acquisition cost", badPhrase:"acquisition getting more expensive", recommendation:"Check Quality Score components and match-type discipline before raising bids.", range:{min:20,max:200,decimals:0}},
  {id:"roas", name:"ROAS", format:"ratio", higherIsBetter:true, goodPhrase:"strong return on spend", badPhrase:"return on spend softening", recommendation:"Audit feed quality and bid strategy fit — a ROAS decline is usually upstream of the bid itself.", range:{min:1,max:8,decimals:1}},
  {id:"ctr", name:"CTR", format:"percent", higherIsBetter:true, goodPhrase:"ad relevance resonating", badPhrase:"ad relevance or creative fatigue slipping", recommendation:"Refresh top creative and check RSA headline diversity.", range:{min:0.5,max:6,decimals:1}},
  {id:"cpc", name:"CPC", format:"currency", higherIsBetter:false, goodPhrase:"efficient cost per click", badPhrase:"cost per click climbing", recommendation:"Check auction insights for new competitors and review Quality Score.", range:{min:0.5,max:8,decimals:2}},
  {id:"conversions", name:"Conversions", format:"number", higherIsBetter:true, goodPhrase:"conversion volume growing", badPhrase:"conversion volume declining", recommendation:"Verify tracking is intact before assuming a demand-side problem.", range:{min:20,max:600,decimals:0}},
  {id:"impression_share", name:"Impression Share", format:"percent", higherIsBetter:true, goodPhrase:"strong auction visibility", badPhrase:"losing auction visibility", recommendation:"Split impression share loss between budget and rank before reacting.", range:{min:20,max:90,decimals:0}},
  {id:"frequency", name:"Frequency", format:"number", higherIsBetter:false, goodPhrase:"healthy reach without over-serving", badPhrase:"creative fatigue risk rising", recommendation:"Set a frequency cap and refresh creative on a defined cadence.", range:{min:1,max:10,decimals:1}},
  {id:"cvr", name:"CVR", format:"percent", higherIsBetter:true, goodPhrase:"strong post-click conversion", badPhrase:"post-click conversion weakening", recommendation:"Check ad-to-landing-page message match before touching targeting.", range:{min:0.5,max:12,decimals:1}},
  {id:"cpm", name:"CPM", format:"currency", higherIsBetter:false, goodPhrase:"efficient reach cost", badPhrase:"reach getting more expensive", recommendation:"Review placement performance and audience overlap.", range:{min:2,max:30,decimals:2}},
  {id:"quality_score", name:"Quality Score", format:"number", higherIsBetter:true, goodPhrase:"strong ad relevance and landing-page experience", badPhrase:"ad relevance or landing-page experience declining", recommendation:"Diagnose the three QS components individually rather than reacting to the score.", range:{min:2,max:10,decimals:0}}
];
const KPI_BY_ID = {}; KPI_LIST.forEach(k=>KPI_BY_ID[k.id]=k);
const FLAT_THRESHOLD = 3;
const FRAMING_BIAS = { "strong quarter":{lo:8,hi:35}, "mixed signals":{lo:-15,hi:15}, "rough patch":{lo:-35,hi:-8} };
const GOOD_NOTES = ["a refreshed creative set landing well", "tighter negative-keyword coverage", "a bid strategy change taking hold", "seasonal demand working in our favor"];
const WATCH_NOTES = ["creative fatigue from an overdue refresh", "a competitor entering the auction", "a landing page change that needs a look", "a feed or tracking issue worth ruling out"];
const FLAT_NOTES = ["no material change in account structure or market", "steady performance with nothing new to report"];
const GENERIC_STEPS = ["Review the account structure for any recent changes that line up with the timing of this shift.", "Cross-check tracking/pixel health before making any bid or budget change.", "Re-evaluate next period once the current change has had a full cycle to settle."];

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
function roundTo(n, decimals){ const f = Math.pow(10, decimals); return Math.round(n * f) / f; }
function randomInRange(range){ return roundTo(range.min + Math.random() * (range.max - range.min), range.decimals); }
function pickFavorablePct(framing){ const b = FRAMING_BIAS[framing] || FRAMING_BIAS["mixed signals"]; return b.lo + Math.random() * (b.hi - b.lo); }

let selectedIds = [];
let rowData = {};
function fmtVal(val, format){
  if (val === null || val === undefined || isNaN(val)) return "—";
  const n = Number(val);
  if (format === "currency") return "$" + n.toLocaleString(undefined, {maximumFractionDigits: n < 100 ? 2 : 0});
  if (format === "percent") return n.toFixed(1) + "%";
  if (format === "ratio") return n.toFixed(1) + "x";
  return Math.round(n).toLocaleString();
}
function randomizeRowField(id, field){
  const kpi = KPI_BY_ID[id]; const range = kpi.range;
  if (!rowData[id]) rowData[id] = {thisVal:"", priorVal:"", note:""};
  if (field === "priorVal"){ rowData[id].priorVal = String(randomInRange(range)); return; }
  if (field === "thisVal"){
    let prior = parseFloat(rowData[id].priorVal);
    if (isNaN(prior)){ prior = randomInRange(range); rowData[id].priorVal = String(prior); }
    const framing = document.getElementById("rpt-period-framing").value;
    const favorable = pickFavorablePct(framing);
    const pct = kpi.higherIsBetter ? favorable : -favorable;
    let thisVal = prior * (1 + pct / 100);
    const floor = Math.max(range.min * 0.3, range.decimals === 0 && range.max > 100 ? 1 : 0.1);
    const ceiling = range.max * 1.5;
    thisVal = Math.min(Math.max(thisVal, floor), ceiling);
    rowData[id].thisVal = String(roundTo(thisVal, range.decimals));
    return;
  }
  if (field === "note"){
    const r = computeRow(id);
    let poolChoice;
    if (r.dir === "good") poolChoice = GOOD_NOTES;
    else if (r.dir === "watch") poolChoice = WATCH_NOTES;
    else if (r.dir === "flat") poolChoice = FLAT_NOTES;
    else poolChoice = GOOD_NOTES.concat(WATCH_NOTES, FLAT_NOTES);
    rowData[id].note = pick(poolChoice);
  }
}
function computeRow(id){
  const kpi = KPI_BY_ID[id]; const d = rowData[id] || {};
  const thisVal = parseFloat(d.thisVal); const priorVal = parseFloat(d.priorVal);
  if (isNaN(thisVal) || isNaN(priorVal) || priorVal === 0){
    return {kpi, thisVal: isNaN(thisVal)?null:thisVal, priorVal: isNaN(priorVal)?null:priorVal, pct:null, dir:"pending", note: d.note||""};
  }
  const pct = ((thisVal - priorVal) / Math.abs(priorVal)) * 100;
  let dir; const favorable = kpi.higherIsBetter ? pct : -pct;
  if (favorable >= FLAT_THRESHOLD) dir = "good"; else if (favorable <= -FLAT_THRESHOLD) dir = "watch"; else dir = "flat";
  return {kpi, thisVal, priorVal, pct, dir, note: d.note||""};
}
function renderChips(){
  const wrap = document.getElementById("rpt-kpi-chips");
  wrap.innerHTML = "";
  KPI_LIST.forEach(k => {
    const chip = document.createElement("button");
    chip.className = "chip" + (selectedIds.includes(k.id) ? " active" : "");
    chip.style.setProperty("--cat-c", "var(--accent)");
    chip.textContent = k.name;
    chip.addEventListener("click", () => toggleKpi(k.id));
    wrap.appendChild(chip);
  });
}
function toggleKpi(id){
  const i = selectedIds.indexOf(id);
  if (i === -1){ selectedIds.push(id); if(!rowData[id]) rowData[id] = {thisVal:"", priorVal:"", note:""}; }
  else selectedIds.splice(i, 1);
  renderChips(); renderRptTable(); renderRptOutput();
}
function renderRptTable(){
  const tbody = document.getElementById("rpt-kpi-tbody");
  tbody.innerHTML = "";
  if (selectedIds.length === 0){ tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No metrics selected yet — pick some above.</td></tr>'; return; }
  selectedIds.forEach(id => {
    const kpi = KPI_BY_ID[id]; const r = computeRow(id);
    const tr = document.createElement("tr");
    let pillHtml;
    if (r.dir === "pending") pillHtml = '<span class="font-mono" style="font-size:0.78rem;color:var(--ink-muted);">enter both values</span>';
    else {
      const arrow = r.pct >= 0 ? "▲" : "▼";
      const color = r.dir==="good" ? "var(--sig-strong)" : (r.dir==="watch" ? "var(--sig-watch)" : "var(--sig-typical)");
      pillHtml = `<span class="font-mono" style="font-size:0.82rem;color:${color};font-weight:700;">${arrow} ${Math.abs(r.pct).toFixed(1)}% · ${r.dir}</span>`;
    }
    tr.innerHTML =
      `<td>${kpi.name}</td>
      <td><div style="display:flex;gap:6px;align-items:center;"><input type="number" data-field="thisVal" data-id="${id}" value="${rowData[id].thisVal ?? ""}" placeholder="0" style="width:90px;background:var(--surface-2);border:1px solid var(--rule);color:var(--ink);border-radius:6px;padding:6px 8px;"/><button type="button" class="btn-mini" data-randfield="thisVal" data-id="${id}" title="Randomize">🎲</button></div></td>
      <td><div style="display:flex;gap:6px;align-items:center;"><input type="number" data-field="priorVal" data-id="${id}" value="${rowData[id].priorVal ?? ""}" placeholder="0" style="width:90px;background:var(--surface-2);border:1px solid var(--rule);color:var(--ink);border-radius:6px;padding:6px 8px;"/><button type="button" class="btn-mini" data-randfield="priorVal" data-id="${id}" title="Randomize">🎲</button></div></td>
      <td>${pillHtml}</td>
      <td><div style="display:flex;gap:6px;align-items:center;"><input type="text" data-field="note" data-id="${id}" value="${(rowData[id].note??"").replace(/"/g,"&quot;")}" placeholder="optional" style="width:160px;background:var(--surface-2);border:1px solid var(--rule);color:var(--ink);border-radius:6px;padding:6px 8px;"/><button type="button" class="btn-mini" data-randfield="note" data-id="${id}" title="Randomize">🎲</button></div></td>
      <td><button type="button" class="btn-mini" data-rm="${id}">Remove</button></td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll("input").forEach(inp => {
    inp.addEventListener("input", e => {
      const id = e.target.getAttribute("data-id"); const field = e.target.getAttribute("data-field");
      rowData[id][field] = e.target.value; renderRptTable(); renderRptOutput();
    });
  });
  tbody.querySelectorAll("[data-rm]").forEach(btn => btn.addEventListener("click", e => toggleKpi(e.target.getAttribute("data-rm"))));
  tbody.querySelectorAll("[data-randfield]").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.currentTarget.getAttribute("data-id"); const field = e.currentTarget.getAttribute("data-randfield");
      randomizeRowField(id, field); renderRptTable(); renderRptOutput();
    });
  });
}
function buildNarrative(){
  const client = document.getElementById("rpt-client-name").value.trim() || "the client";
  const period = document.getElementById("rpt-report-period").value.trim() || "this period";
  const framing = document.getElementById("rpt-period-framing").value;
  const rows = selectedIds.map(computeRow).filter(r => r.dir !== "pending");
  const wins = rows.filter(r => r.dir === "good");
  const watches = rows.filter(r => r.dir === "watch");
  const flats = rows.filter(r => r.dir === "flat");

  document.getElementById("rpt-stat-tracked").textContent = selectedIds.length;
  document.getElementById("rpt-stat-wins").textContent = wins.length;
  document.getElementById("rpt-stat-watch").textContent = watches.length;

  if (rows.length === 0) return "Select metrics above and enter this-period and prior-period values for at least one to generate a draft narrative.";

  function sentence(r, good){
    const verb = r.pct >= 0 ? "climbed to" : "dropped to";
    const label = good ? (r.kpi.higherIsBetter ? "increase" : "reduction") : (r.kpi.higherIsBetter ? "decline" : "increase");
    const phrase = good ? r.kpi.goodPhrase : r.kpi.badPhrase;
    const note = r.note.trim().replace(/\.$/, "");
    const noteClause = note ? ", noted as driven by " + note.charAt(0).toLowerCase() + note.slice(1) : "";
    return r.kpi.name + " " + verb + " " + fmtVal(r.thisVal, r.kpi.format) + " (from " + fmtVal(r.priorVal, r.kpi.format) + "), a " + Math.abs(r.pct).toFixed(1) + "% " + label + " — " + phrase + noteClause + ".";
  }
  let biggest = null;
  [...wins, ...watches].forEach(r => { if (!biggest || Math.abs(r.pct) > Math.abs(biggest.pct)) biggest = r; });
  if (!biggest && flats.length) biggest = flats[0];

  let out = client + " — " + period + "\n\nEXECUTIVE SUMMARY\n";
  if (biggest && biggest.dir !== "flat"){
    out += period.charAt(0).toUpperCase() + period.slice(1) + " was framed as a " + framing + " for " + client + ". The headline mover was " + biggest.kpi.name + ", which " + (biggest.pct>=0?"climbed to":"dropped to") + " " + fmtVal(biggest.thisVal, biggest.kpi.format) + " (from " + fmtVal(biggest.priorVal, biggest.kpi.format) + "), a " + Math.abs(biggest.pct).toFixed(1) + "% move — " + (biggest.dir==="good"?biggest.kpi.goodPhrase:biggest.kpi.badPhrase) + ".\n\n";
  } else {
    out += period.charAt(0).toUpperCase() + period.slice(1) + " was framed as a " + framing + " for " + client + ". Metrics held roughly steady across the board — nothing moved sharply in either direction.\n\n";
  }
  out += "WINS\n";
  out += wins.length ? wins.map(r => "- " + sentence(r, true)).join("\n") : "- No metric moved clearly in the favorable direction this period.";
  out += "\n\nWATCH-OUTS\n";
  out += watches.length ? watches.map(r => "- " + sentence(r, false)).join("\n") : "- Nothing flagged as a concern this period.";
  if (flats.length){
    out += "\n\nHOLDING STEADY\n";
    out += flats.map(r => "- " + r.kpi.name + " held roughly flat at " + fmtVal(r.thisVal, r.kpi.format) + " (" + (r.pct>=0?"+":"") + r.pct.toFixed(1) + "%).").join("\n");
  }
  let steps;
  if (watches.length >= 2) steps = watches.slice(0,3).map(r => r.kpi.recommendation);
  else if (watches.length === 1) steps = [watches[0].kpi.recommendation, ...GENERIC_STEPS.slice(0,2)];
  else steps = GENERIC_STEPS;
  out += "\n\nNEXT STEPS\n" + steps.map((s,i) => (i+1) + ". " + s).join("\n");
  return out;
}
function renderRptOutput(){ document.getElementById("rpt-output-text").value = buildNarrative(); }
document.getElementById("rpt-client-name").addEventListener("input", renderRptOutput);
document.getElementById("rpt-report-period").addEventListener("input", renderRptOutput);
document.getElementById("rpt-period-framing").addEventListener("change", renderRptOutput);
document.getElementById("rpt-copy-btn").addEventListener("click", ()=>{
  const ta = document.getElementById("rpt-output-text");
  ta.focus(); ta.select();
  const done = () => { const el=document.getElementById('rpt-copy-status'); el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),1600); };
  if (navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(ta.value).then(done, ()=>{ try{document.execCommand('copy');}catch(e){} done(); }); }
  else { try{document.execCommand('copy');}catch(e){} done(); }
});
renderChips(); renderRptTable(); renderRptOutput();

/* ================= BOOTSTRAP ================= */
buildIndexChips();
renderIndex();
updateSelIndicator();

/* Theme sync when embedded in the suite iframe */
window.addEventListener('message', (e)=>{
  if (e.data && e.data.type === 'set-theme'){ document.documentElement.setAttribute('data-theme', e.data.theme); }
});
