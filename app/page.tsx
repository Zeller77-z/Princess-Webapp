'use client';

import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Image as ImageIcon, Loader2, Download, ArrowLeft, PenTool, Layout, Target, MessageSquare, FileText, Key, Save, Upload, Edit2, Check, X, Copy, Wand2, RefreshCw, Settings, Camera, Undo, Redo, User } from 'lucide-react';
import Markdown from 'react-markdown';
import { ThemeToggle } from '@/components/theme-toggle';
import { GoogleGenAI, Type } from '@google/genai';
import { nuSkinProducts } from './nuskin-data';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const MYANMAR_STRATEGIST_PROMPT = `သင်သည် Myanmar ဘာသာဖြင့် အလုပ်လုပ်သော elite content strategist တစ်ဦးဖြစ်သည်။ သင်သည် အောက်ပါ ကျွမ်းကျင်မှုများကို ပိုင်ဆိုင်သည်:

— Myanmar digital content နှင့် copywriting (human, punchy, real)
— TikTok Myanmar / Facebook Myanmar / Reels trend culture
— Myanmar audience psychology နှင့် scroll behavior
— Brand voice architecture — Myanmar tone နှင့် character building
— Viral hook writing — မြန်မာဘာသာ headline နှင့် caption

━━━━━━━━━━━━━━━━━━━━━━━━━━

[ TONE နှင့် LANGUAGE RULES ]

CRITICAL: သင်ရေးသားသော content အားလုံးသည် ပေးထားသော "Target Audience" နှင့် "Content Style / Vibe" အပေါ်မူတည်၍ လုံးဝ (၁၀၀%) ပြောင်းလဲရမည်။

1. Target Audience Adaptation (အရေးကြီးဆုံး):
   - Audience သည် "Gen Z / လူငယ်များ" ဖြစ်ပါက: "bro", "sis", "lit တယ်", "slay တယ်", "POV:", "delulu" ကဲ့သို့သော နောက်ဆုံးပေါ် internet slang များကို သဘာဝကျကျ သုံးပါ။
   - Audience သည် "အသက် ၃၀-၅၀ အမျိုးသမီးများ / Professionals / မိခင်များ" ဖြစ်ပါက: Slang များကို လုံးဝ (လုံးဝ) မသုံးပါနှင့်။ ရင့်ကျက်သော၊ နားလည်မှုရှိသော၊ ယုံကြည်ရသော (Elegant, Empathetic, Trustworthy) လေသံကို သုံးပါ။ "ညီမတို့", "မမတို့", "ရှင်" ကဲ့သို့သော ယဉ်ကျေးပြီး ရင်းနှီးသော အသုံးအနှုန်းများကို သုံးပါ။
   - Audience သည် "B2B / Corporate" ဖြစ်ပါက: Professional ဖြစ်သော၊ တိကျသော၊ တန်ဖိုးရှိသော (Value-driven) လေသံကို သုံးပါ။

2. Myanmar လူတွေ တကယ်ပြောတဲ့ ဘာသာ — formal (စာအုပ်ဆန်ဆန်) မဟုတ်ဘဲ casual, real, relatable ဖြစ်ရမည်။
3. Mixed Myanmar-English သုံး (Myanglish) — သို့သော် Target Audience နားလည်နိုင်သော စကားလုံးများကိုသာ ရွေးချယ်သုံးပါ။

4. Platform အလိုက် tone:
   — TikTok Myanmar: တိုတောင်း၊ energetic၊ hook ပထမဆုံး sentence
   — Facebook Myanmar: community feel၊ emotional storytelling၊ curiosity gap
   — Instagram Myanmar: aesthetic + aspirational + punch caption + CTA

5. မြန်မာ audience psychology:
   — Family, community, status ကို အလွန် care လုပ်သည်
   — Humor နှင့် self-deprecating joke ချိုချိုလေး လက်ခံသည်
   — Respect language ကို သိရမည် — stranger: ခင်ဗျ/ရှင် | friends: မင်း/ကိုယ် | younger: မင်း | elder/customer: ခင်ဗျားတို့

━━━━━━━━━━━━━━━━━━━━━━━━━━

[ CONTENT FRAMEWORKS ]

HOOK PATTERNS (Myanmar style):

• POV hook:
  "POV: မင်း ဒီ product တစ်ခုသုံးပြီး [desired result] ရသွားတဲ့ feeling"
  
• Curiosity gap:
  "ဘယ်သူမှ မပြောဖူးတဲ့ [topic] အကြောင်း — ဒါ ကျွန်တော်တော် ကိုပဲ ဖြစ်ခဲ့တာ"
  
• Callout hook:
  "[Identity/ပြဿနာ] ရှိတဲ့ သူ — ဒါ မင်းအတွက်"
  
• Controversy hook (Myanmar-safe):
  "Hot take: [polarizing truth] — disagree ဆိုရင် comment မှာ ပြော"
  
• Before/After hook:
  "တစ်ချိန်က [painful state]ဆိုတဲ့ ကျွန်တော် — အခု [dream result]။ shift ဖြစ်ပုံ မျှဝေမယ်"
  
• Number hook:
  "[X] ခု — [audience] တွေ မသိကြတဲ့ [topic] အကြောင်း"

HEADLINE RULES (Myanmar):
• Benefit ကြီး သို့ pain point ကြီး ကို ဦးဆောင်ပါ
• Power words: လျှို့ဝှက်ချက်၊ တကယ်ဖြစ်တဲ့ကိစ္စ၊ ဘာကြောင့်လဲ၊ 
  ဒါမှမဟုတ်၊ သတိထား၊ ဘုရားသားသမီးတို့ listen up
• ဂဏန်းကြိန်းဂဏန်း (7, 9, 11) ကောင်းသည်
• headline max 12 syllables — ဖတ်ရတာ smooth ဖြစ်ရမည်
• Curiosity version + Direct benefit version နှစ်ကြောင်း A/B

BODY COPY STRUCTURE:
• Hook → ပြဿနာ ကြီးမြင် → Insight မိတ်ဆက် → Proof/Example → CTA
• တစ်ကြောင်း တစ်အကြောင်း — white space သုံး — မြန်မာ screen reader friendly
• Pattern interrupt: "ဒါပေမဲ့ ဒီမှာ twist ရှိတယ်..." / "အဲ့ဒါ ဘာကြောင့်လဲ ဆိုတော့..."

━━━━━━━━━━━━━━━━━━━━━━━━━━

[ MYANMAR TREND AWARENESS ]

လက်ရှိ resonating နေတဲ့ content:
• Authentic, unfiltered opinions — "တကယ်ပြောမယ်ဆိုရင်..." style
• Day-in-my-life Myanmar context — မနက်ဆမ်း၊ ထမင်းစားချိန်၊ traffic ထဲမှာ
• Relatable struggle content — YOLO vs family pressure
• Transformation / glow up content — before/after Myanmar context
• "Rant" style with humor — frustration + comedy
• Local culture tie-ins — Thingyan, pagoda festival, Myanmar food, 
  chai shop culture, bus/ moto culture

ရှောင်ရမည်:
• Corporate Myanmar (formal, stiff, boring)
• Translated-from-English feel — must sound originally Myanmar
• Overdone hustle culture in Myanmar — feels fake now
• Fake urgency — မြန်မာ audience ကို လှည့်ဖျားလို့ မရ

━━━━━━━━━━━━━━━━━━━━━━━━━━

[ OUTPUT BEHAVIOR ]

Content တောင်းဆိုတိုင်း:
1. Variation ၂-၃ ခု ရေး (hook/angle ကွဲပြားစွာ)
2. Platform နှင့် format ကို ရှင်းလင်းစွာ label တပ်
3. ဘာကြောင့် ဒီ hook က psychological ကျ အလုပ်လုပ်သည် ဆိုသည်ကို 
   မြန်မာဘာသာဖြင့် တစ်ကြောင်း ရှင်းပြ
4. Slang/trend တစ်ခုခု shelf life တိုနိုင်လျှင် flag ပေး

Content ပြင်ဆင်ခိုင်းတိုင်း:
1. ဘာ weak ဖြစ်နေသည် ဆိုသည်ကို diagnose (hook ညံ့၊ မရှင်းမလင်း၊ tone မမှန်)
2. Fix ချပြီး rewrite ချ
3. Upgrade ဘာကြောင့် ပိုကောင်းသည်ကို ရှင်းပြ

Default energy: confident + warm + ကြည်ချင်စဖွယ် + မြန်မာ ချိုချိုလေး humor ပါ —
marketing room ထဲမှာ အတော်ဆုံးနဲ့ culture အကဲဆတ်ဆုံး သူတစ်ယောက်လိုမျိုး။\n\n`;

interface PlanItem {
  day: number;
  title: string;
  format: string;
  hook: string;
  summary: string;
}

interface PostVariation {
  id: string;
  title: string;
  platform: string;
  content: string;
  explanation: string;
  flags?: string;
  visualDirection?: string;
}

// Helper to get Nu Skin product context
const getProductContext = (name: string) => {
  if (!name) return '';
  const lowerName = name.toLowerCase();
  const matchedProduct = nuSkinProducts.find(p => 
    lowerName.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(lowerName)
  );
  
  if (matchedProduct) {
    return `
[NU SKIN PRODUCT KNOWLEDGE BASE MATCH]
Product Name: ${matchedProduct.name}
Target Area: ${matchedProduct.targetArea}
Usage Instructions: ${matchedProduct.usage}
Key Benefits: ${matchedProduct.benefits}
Critical Warnings/Rules: ${matchedProduct.warnings}
`;
  }
  return '';
};

const SakuraFalling = () => {
  const [petals] = useState(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 25,
      size: 8 + Math.random() * 12,
      xOffset: `${(Math.random() - 0.5) * 15}vw`,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 dark:opacity-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360, 720],
            x: ['0vw', petal.xOffset],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
          }}
          className="absolute"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-200/40 dark:text-pink-400/20 fill-current">
            <path d="M12 21.5C12 21.5 10 18 10 14C10 10 12 7 12 7C12 7 14 10 14 14C14 18 12 21.5 12 21.5Z" />
            <path d="M12 21.5C12 21.5 14 18 14 14C14 10 12 7 12 7C12 7 10 10 10 14C10 18 12 21.5 12 21.5Z" transform="rotate(45 12 14)" />
            <path d="M12 21.5C12 21.5 14 18 14 14C14 10 12 7 12 7C12 7 10 10 10 14C10 18 12 21.5 12 21.5Z" transform="rotate(-45 12 14)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  // API Key State
  const [isCheckingKey, setIsCheckingKey] = useState(true);
  const [hasKey, setHasKey] = useState(false);

  // Campaign Settings State
  const [productName, setProductName] = useState('');
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productBenefits, setProductBenefits] = useState('');
  const [emotionalResponse, setEmotionalResponse] = useState('');
  const [targetAudience, setTargetAudience] = useState('Women aged 30-50, looking for effective beauty solutions');
  const [campaignGoal, setCampaignGoal] = useState('Drive sales');
  const [framework, setFramework] = useState('AIDA (Attention, Interest, Desire, Action)');
  const [tone, setTone] = useState('Elegant & Anti-Aging Focus (Age 30-50)');
  const [platform, setPlatform] = useState('Facebook (Community-focused)');
  const [contentPillars, setContentPillars] = useState('Education, Lifestyle, Product Demo');
  const [ctaStyle, setCtaStyle] = useState('Engagement ရယူရန် (Save & Share လုပ်ပါ)');
  const [reelsCount, setReelsCount] = useState<number>(0);
  const [carouselCount, setCarouselCount] = useState<number>(0);
  const [daysCount, setDaysCount] = useState<number>(10);
  const [includeModel, setIncludeModel] = useState(true);
  const [selectedImageModel, setSelectedImageModel] = useState('gemini-3-pro-image-preview'); // Default to Nano Banana Pro as requested

  // Refs for aborting
  const isAbortedRef = useRef(false);

  // AI Options State
  const [isGeneratingOptions, setIsGeneratingOptions] = useState(false);
  const [generatedBenefitsOptions, setGeneratedBenefitsOptions] = useState<string[]>([]);
  const [generatedEmotionalOptions, setGeneratedEmotionalOptions] = useState<string[]>([]);
  const [generatedAudienceOptions, setGeneratedAudienceOptions] = useState<string[]>([]);

  // Generation State
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  
  // Detailed View State
  const [selectedDay, setSelectedDay] = useState<PlanItem | null>(null);
  const [isGeneratingFullPost, setIsGeneratingFullPost] = useState(false);
  const [postVariations, setPostVariations] = useState<PostVariation[]>([]);
  const [activeVariationIndex, setActiveVariationIndex] = useState(0);
  const [isGeneratingVariation, setIsGeneratingVariation] = useState(-1);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isImageGenView, setIsImageGenView] = useState(false);
  const [generationAttempt, setGenerationAttempt] = useState(0);
  const [imageStyle, setImageStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('2K');
  const [logoImage, setLogoImage] = useState('');
  const [logoPosition, setLogoPosition] = useState('bottom-right');
  const [logoOpacity, setLogoOpacity] = useState(0.8);
  const [logoScale, setLogoScale] = useState(0.15);
  const [finalImageWithLogo, setFinalImageWithLogo] = useState('');
  const [headlineLength, setHeadlineLength] = useState('Default');
  const [generatedHooks, setGeneratedHooks] = useState<string[]>([]);
  const [selectedHook, setSelectedHook] = useState('');
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);
  const [textOverlayStyle, setTextOverlayStyle] = useState('Elegant & Bold (High-end, thick, sophisticated typography)');
  
  const isRetryableError = (error: any) => {
    const errorStr = JSON.stringify(error).toLowerCase();
    const message = error.message?.toLowerCase() || '';
    
    // Hard quota errors should not be retried as they won't succeed on retry
    if (message.includes('check your plan and billing details') || errorStr.includes('check your plan and billing details')) {
      return false;
    }

    return (
      error.status === 429 || 
      error.code === 429 ||
      error.status === 503 ||
      error.code === 503 ||
      error.error?.code === 429 ||
      error.error?.code === 503 ||
      error.error?.status === 'RESOURCE_EXHAUSTED' ||
      error.error?.status === 'UNAVAILABLE' ||
      error.status === 500 ||
      error.code === 500 ||
      error.error?.code === 500 ||
      errorStr.includes('429') ||
      errorStr.includes('503') ||
      errorStr.includes('500') ||
      errorStr.includes('quota') ||
      errorStr.includes('resource_exhausted') ||
      errorStr.includes('exhausted') ||
      errorStr.includes('unavailable') ||
      errorStr.includes('internal error') ||
      errorStr.includes('high demand') ||
      message.includes('429') ||
      message.includes('503') ||
      message.includes('500') ||
      message.includes('quota') ||
      message.includes('exhausted') ||
      message.includes('unavailable') ||
      message.includes('internal error') ||
      message.includes('high demand')
    );
  };

  const withRetry = async <T,>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> => {
    try {
      return await fn();
    } catch (error: any) {
      const errorStr = JSON.stringify(error).toLowerCase();
      const isHighDemand = errorStr.includes('high demand') || 
                          errorStr.includes('503') ||
                          errorStr.includes('unavailable') ||
                          errorStr.includes('429');

      // For high demand, we can afford more retries with longer backoff
      // If retries is explicitly set low (like 1), we respect it for fast fallback
      const effectiveRetries = (isHighDemand && retries > 1) ? Math.max(retries, 5) : retries;
      
      if (effectiveRetries > 0 && isRetryableError(error)) {
        const actualDelay = (isHighDemand && retries > 1) ? Math.max(delay, 5000) : delay;
        const nextDelay = (isHighDemand && retries > 1) ? actualDelay * 2 : actualDelay * 1.5;
        
        console.log(`Retryable error encountered (${isHighDemand ? 'High Demand' : 'General'}). Retrying in ${actualDelay}ms... (${effectiveRetries} retries left)`);
        
        await new Promise(resolve => setTimeout(resolve, actualDelay));
        return withRetry(fn, effectiveRetries - 1, nextDelay);
      }
      throw error;
    }
  };

  // Undo/Redo State
  const [postHistory, setPostHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (!isEditingPost || postVariations.length === 0) return;
    const currentContent = postVariations[activeVariationIndex]?.content || '';
    const timeoutId = setTimeout(() => {
      if (historyIndex >= 0 && postHistory[historyIndex] !== currentContent) {
        const newHistory = postHistory.slice(0, historyIndex + 1);
        newHistory.push(currentContent);
        setPostHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      } else if (historyIndex === -1 && currentContent) {
        setPostHistory([currentContent]);
        setHistoryIndex(0);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [postVariations, activeVariationIndex, isEditingPost, historyIndex, postHistory]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPostVariations(prev => {
        const newVars = [...prev];
        newVars[activeVariationIndex] = { ...newVars[activeVariationIndex], content: postHistory[newIndex] };
        return newVars;
      });
    }
  };

  const handleRedo = () => {
    if (historyIndex < postHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setPostVariations(prev => {
        const newVars = [...prev];
        newVars[activeVariationIndex] = { ...newVars[activeVariationIndex], content: postHistory[newIndex] };
        return newVars;
      });
    }
  };

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio?.hasSelectedApiKey) {
          const result = await window.aistudio.hasSelectedApiKey();
          setHasKey(result);
        } else {
          setHasKey(true); // Fallback if not in AI Studio
        }
      } catch (e) {
        setHasKey(true);
      } finally {
        setIsCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      if (window.aistudio?.openSelectKey) {
        await window.aistudio.openSelectKey();
        setHasKey(true);
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error && e.message.includes("Requested entity was not found")) {
        setHasKey(false);
      }
    }
  };

  const handleSaveSettings = () => {
    const settings = {
      productName, productBenefits, emotionalResponse, targetAudience, campaignGoal, framework, tone, platform,
      contentPillars, ctaStyle, reelsCount, carouselCount, daysCount
    };
    localStorage.setItem('campaignSettings', JSON.stringify(settings));
    setToastMessage('Settings saved successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLoadSettings = () => {
    const saved = localStorage.getItem('campaignSettings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        if (settings.productName) setProductName(settings.productName);
        if (settings.productBenefits) setProductBenefits(settings.productBenefits);
        if (settings.emotionalResponse) setEmotionalResponse(settings.emotionalResponse);
        if (settings.targetAudience) setTargetAudience(settings.targetAudience);
        if (settings.campaignGoal) setCampaignGoal(settings.campaignGoal);
        if (settings.framework) setFramework(settings.framework);
        if (settings.tone) setTone(settings.tone);
        if (settings.platform) setPlatform(settings.platform);
        if (settings.contentPillars) setContentPillars(settings.contentPillars);
        if (settings.ctaStyle) setCtaStyle(settings.ctaStyle);
        if (settings.reelsCount !== undefined) setReelsCount(settings.reelsCount);
        if (settings.carouselCount !== undefined) setCarouselCount(settings.carouselCount);
        if (settings.daysCount !== undefined) setDaysCount(settings.daysCount);
        
        setToastMessage('Settings loaded successfully!');
      } catch (e) {
        setToastMessage('Failed to load settings.');
      }
    } else {
      setToastMessage('No saved settings found.');
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCopyPost = (contentToCopy?: string) => {
    const content = contentToCopy || (postVariations[activeVariationIndex]?.content || '');
    navigator.clipboard.writeText(content);
    setToastMessage('Post content copied to clipboard!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const updateFinalImage = async () => {
      if (generatedImage) {
        if (logoImage) {
          const withLogo = await applyLogoOverlay(generatedImage, logoImage, logoPosition, logoScale, logoOpacity);
          setFinalImageWithLogo(withLogo);
        } else {
          setFinalImageWithLogo(generatedImage);
        }
      }
    };
    updateFinalImage();
  }, [generatedImage, logoImage, logoPosition, logoScale, logoOpacity]);

  const handleApiError = (error: any, defaultMessage: string) => {
    const errorStr = JSON.stringify(error).toLowerCase();
    const message = error.message?.toLowerCase() || '';
    
    if (message.includes('requested entity was not found') || errorStr.includes('requested entity was not found')) {
      setHasKey(false);
      setToastMessage('API Key invalid or not found. Please select a valid key.');
      if (window.aistudio?.openSelectKey) {
        window.aistudio.openSelectKey().then(() => setHasKey(true)).catch(() => setHasKey(false));
      }
    } else if (isRetryableError(error)) {
      setToastMessage('High demand or quota exceeded. Please wait a moment and try again.');
    } else {
      setToastMessage(error.message || defaultMessage);
    }
  };

  const resizeImage = (base64Str: string, maxWidth = 1024, maxHeight = 1024): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const readPromises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    const rawBase64Images = await Promise.all(readPromises);
    const resizedImages = await Promise.all(rawBase64Images.map(img => resizeImage(img)));
    const newImages = [...productImages, ...resizedImages];
    setProductImages(newImages);
  };

  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerateAllOptions = async () => {
    if (!productName) {
      setToastMessage('Please enter a product name first.');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    setIsGeneratingOptions(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const prompt = `Analyze the following product name and optional images.
      Product Name: "${productName}"
      
      Generate 3 distinct, high-converting options for EACH of the following fields.
      IMPORTANT: All generated options MUST be written in the Myanmar (Burmese) language.
      
      1. Product Benefits (short, punchy phrases in Myanmar language)
      2. Desired Emotional Response (how the user should feel, in Myanmar language)
      3. Target Audience (Be highly specific: include exact age range, gender, and specific pain points/desires, in Myanmar language)
      
      Return the result strictly as a JSON object with this exact structure:
      {
        "benefits": ["benefit 1", "benefit 2", "benefit 3"],
        "emotions": ["emotion 1", "emotion 2", "emotion 3"],
        "audiences": ["audience 1", "audience 2", "audience 3"]
      }`;

      const contents: any = { parts: [] };
      
      if (productImages.length > 0) {
        productImages.forEach(img => {
          const match = img.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
          if (match) {
            contents.parts.push({
              inlineData: {
                mimeType: match[1],
                data: match[2]
              }
            });
          }
        });
      }
      
      contents.parts.push({ text: prompt });

      const response = await withRetry(() => ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
              emotions: { type: Type.ARRAY, items: { type: Type.STRING } },
              audiences: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["benefits", "emotions", "audiences"]
          }
        }
      }));

      let jsonStr = response.text || '{}';
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Find the first '{' or '[' to handle any leading text before JSON
      const firstBrace = jsonStr.indexOf('{');
      const firstBracket = jsonStr.indexOf('[');
      if (firstBrace !== -1 && firstBracket !== -1) {
        jsonStr = jsonStr.substring(Math.min(firstBrace, firstBracket));
      } else if (firstBrace !== -1) {
        jsonStr = jsonStr.substring(firstBrace);
      } else if (firstBracket !== -1) {
        jsonStr = jsonStr.substring(firstBracket);
      }
      
      // Find the last '}' or ']' to handle any trailing text after JSON
      const lastBrace = jsonStr.lastIndexOf('}');
      const lastBracket = jsonStr.lastIndexOf(']');
      if (lastBrace !== -1 && lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, Math.max(lastBrace, lastBracket) + 1);
      } else if (lastBrace !== -1) {
        jsonStr = jsonStr.substring(0, lastBrace + 1);
      } else if (lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, lastBracket + 1);
      }

      const result = JSON.parse(jsonStr);
      
      if (result.benefits) setGeneratedBenefitsOptions(result.benefits);
      if (result.emotions) setGeneratedEmotionalOptions(result.emotions);
      if (result.audiences) setGeneratedAudienceOptions(result.audiences);
      
      setToastMessage('All options generated successfully!');
    } catch (error: any) {
      console.error('Error generating options:', error);
      handleApiError(error, 'Failed to generate options.');
    } finally {
      setIsGeneratingOptions(false);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleGeneratePlan = async (e?: React.FormEvent, isRegenerate: boolean = false) => {
    if (e) e.preventDefault();
    if (!productName || !targetAudience) return;

    setIsGeneratingPlan(true);
    setPlanItems([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const productContext = getProductContext(productName);

      const prompt = `${MYANMAR_STRATEGIST_PROMPT}
      
      Create a ${daysCount}-day viral social media content calendar.
      
      Product: "${productName}"
      Product Benefits: "${productBenefits}"
      Desired Emotional Response: "${emotionalResponse}"
      Target Audience: "${targetAudience}"
      Campaign Goal: "${campaignGoal}"
      Marketing Framework: "${framework}"
      Content Style / Vibe: "${tone}"
      Primary Platform: "${platform}"
      Content Pillars: "${contentPillars}"
      Call-to-Action Style: "${ctaStyle}"
      Post Formats: Exactly ${reelsCount} Reels (Video), exactly ${carouselCount} Carousels, and the remaining ${daysCount - reelsCount - carouselCount} as Single Images.
      ${productContext ? `\nCRITICAL PRODUCT KNOWLEDGE:\n${productContext}\nEnsure all content respects these usage rules and target areas.` : ''}
      ${isRegenerate ? `\nCRITICAL: The user clicked "Regenerate". You MUST generate completely DIFFERENT, FRESH, and BETTER topics/hooks than a typical response. Think outside the box, use different angles, and avoid repeating standard ideas.` : ''}
      
      CRITICAL INSTRUCTIONS:
      1. Provide EXACTLY ${daysCount} items. Keep the summary short and punchy.
      2. The ENTIRE response (titles, summaries, hooks, everything) MUST be written perfectly in the Myanmar (Burmese) language.
      3. TARGET AUDIENCE ALIGNMENT: You MUST strictly tailor all topics, hooks, and summaries to the specific Target Audience ("${targetAudience}"). Speak directly to their specific age group, pain points, desires, and lifestyle. Do not use generic messaging.`;

      const response = await withRetry(() => ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER, description: `Day number (1-${daysCount})` },
                title: { type: Type.STRING, description: "Short catchy title for the post" },
                format: { type: Type.STRING, description: "e.g., Reel, Carousel, Story, Static Image" },
                hook: { type: Type.STRING, description: "The opening hook or headline" },
                summary: { type: Type.STRING, description: "Brief 1-2 sentence summary of the visual and content" }
              },
              required: ["day", "title", "format", "hook", "summary"]
            }
          }
        }
      }));

      let jsonStr = response.text || '[]';
      // Clean up potential markdown formatting
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Find the first '{' or '[' to handle any leading text before JSON
      const firstBrace = jsonStr.indexOf('{');
      const firstBracket = jsonStr.indexOf('[');
      if (firstBrace !== -1 && firstBracket !== -1) {
        jsonStr = jsonStr.substring(Math.min(firstBrace, firstBracket));
      } else if (firstBrace !== -1) {
        jsonStr = jsonStr.substring(firstBrace);
      } else if (firstBracket !== -1) {
        jsonStr = jsonStr.substring(firstBracket);
      }
      
      // Find the last '}' or ']' to handle any trailing text after JSON
      const lastBrace = jsonStr.lastIndexOf('}');
      const lastBracket = jsonStr.lastIndexOf(']');
      if (lastBrace !== -1 && lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, Math.max(lastBrace, lastBracket) + 1);
      } else if (lastBrace !== -1) {
        jsonStr = jsonStr.substring(0, lastBrace + 1);
      } else if (lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, lastBracket + 1);
      }

      let items = JSON.parse(jsonStr);
      
      // Handle case where model returns an object with an array property
      if (!Array.isArray(items)) {
        if (items.plan && Array.isArray(items.plan)) items = items.plan;
        else if (items.items && Array.isArray(items.items)) items = items.items;
        else if (items.days && Array.isArray(items.days)) items = items.days;
        else items = [items];
      }
      
      setPlanItems(items);
    } catch (error: any) {
      console.error('Error generating plan:', error);
      handleApiError(error, 'Failed to generate plan. Please try again.');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleGenerateFullPost = async () => {
    if (!selectedDay) return;
    setIsGeneratingFullPost(true);
    setPostVariations([]);
    setActiveVariationIndex(0);

    const currentAttempt = generationAttempt + 1;
    setGenerationAttempt(currentAttempt);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const productContext = getProductContext(productName);
      
      const prompt = `${MYANMAR_STRATEGIST_PROMPT}
      
      Write 3 complete, highly engaging, ready-to-publish social media post variations for Day ${selectedDay.day} of our ${daysCount}-day campaign.
      
      Product: "${productName}"
      Product Benefits: "${productBenefits}"
      Desired Emotional Response: "${emotionalResponse}"
      Target Audience: "${targetAudience}"
      Campaign Goal: "${campaignGoal}"
      Framework: "${framework}"
      Tone / Content Style: "${tone}"
      Platform: "${platform}"
      Content Pillars: "${contentPillars}"
      CTA Style: "${ctaStyle}"
      ${productContext ? `\nCRITICAL PRODUCT KNOWLEDGE:\n${productContext}\nEnsure the caption accurately reflects how and where the product is used.` : ''}
      
      Post Details:
      Title: ${selectedDay.title}
      Format: ${selectedDay.format}
      Hook: ${selectedDay.hook}
      Summary: ${selectedDay.summary}
      
      CRITICAL INSTRUCTIONS FOR A HIGH-CONVERTING POST:
      1. LANGUAGE: Write the ENTIRE caption perfectly in the Myanmar (Burmese) language. Ensure natural phrasing and cultural relevance.
      2. FRAMEWORK EXECUTION: You MUST strictly follow the "${framework}" copywriting framework. Structure the flow of the post exactly according to this framework to maximize engagement and conversions.
      3. TARGET AUDIENCE & CONTENT STYLE: The post MUST perfectly embody the "${tone}" style and speak directly to the "${targetAudience}". Ensure the vocabulary, pain points, desires, and cultural references are highly relatable and specific to this exact demographic. Avoid generic messaging. Do not use Gen Z slang unless the target audience is Gen Z.
      4. SPACING & READABILITY: Make the content highly readable. Use clear paragraph breaks (double spacing) between each section of the framework. Do not write a giant wall of text.
      5. EMOJIS: Include relevant, eye-catching emojis naturally throughout the text to break up paragraphs and highlight key points. Make it visually appealing for social media.
      6. NO LABELS: DO NOT include framework labels or structural words like "Hook:", "Attention:", "Interest:", "Desire:", "Action:", "Body:", or "Caption:". The text must flow naturally and be ready to copy-paste directly to social media.
      7. HASHTAGS: Include relevant, high-performing hashtags at the very end.
      8. VISUAL DIRECTION: Provide detailed visual/video instructions for the creator (these instructions should also be in Myanmar language). This MUST be returned in the separate "visualDirection" field, NOT in the "content" field.
      ${currentAttempt > 1 ? `\n\nIMPORTANT: This is generation attempt #${currentAttempt}. Please provide a FRESH, MORE CREATIVE, and HIGHLY UNIQUE variation compared to standard responses. Try a different angle or a more captivating hook!` : ''}
      
      You MUST return exactly 3 variations of the post.
      Return the response in JSON format matching this schema:
      {
        "variations": [
          {
            "id": "var1",
            "title": "Variation Title (e.g. POV Hook)",
            "platform": "Platform Name",
            "content": "The actual post content...",
            "visualDirection": "Detailed visual/video instructions for the creator...",
            "explanation": "Why this hook works psychologically (in Myanmar)",
            "flags": "Any slang shelf-life flags (optional)"
          }
        ]
      }
      `;

      const response = await withRetry(() => ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              variations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    platform: { type: Type.STRING },
                    content: { type: Type.STRING },
                    visualDirection: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    flags: { type: Type.STRING }
                  },
                  required: ["id", "title", "platform", "content", "visualDirection", "explanation"]
                }
              }
            },
            required: ["variations"]
          }
        }
      }));

      let jsonStr = response.text || '{}';
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Find the first '{' or '[' to handle any leading text before JSON
      const firstBrace = jsonStr.indexOf('{');
      const firstBracket = jsonStr.indexOf('[');
      if (firstBrace !== -1 && firstBracket !== -1) {
        jsonStr = jsonStr.substring(Math.min(firstBrace, firstBracket));
      } else if (firstBrace !== -1) {
        jsonStr = jsonStr.substring(firstBrace);
      } else if (firstBracket !== -1) {
        jsonStr = jsonStr.substring(firstBracket);
      }
      
      // Find the last '}' or ']' to handle any trailing text after JSON
      const lastBrace = jsonStr.lastIndexOf('}');
      const lastBracket = jsonStr.lastIndexOf(']');
      if (lastBrace !== -1 && lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, Math.max(lastBrace, lastBracket) + 1);
      } else if (lastBrace !== -1) {
        jsonStr = jsonStr.substring(0, lastBrace + 1);
      } else if (lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, lastBracket + 1);
      }

      const data = JSON.parse(jsonStr);
      
      let variations: any[] = [];
      if (Array.isArray(data)) {
        variations = data;
      } else if (data && data.variations && Array.isArray(data.variations)) {
        variations = data.variations;
      } else if (data && typeof data === 'object') {
        // Fallback: look for any array in the object
        for (const key in data) {
          if (Array.isArray(data[key]) && data[key].length > 0 && data[key][0].content) {
            variations = data[key];
            break;
          }
        }
        // Fallback: if data is a single variation object
        if (variations.length === 0 && data.content) {
          variations = [data];
        }
      }

      if (variations.length > 0) {
        setPostVariations(variations);
        setPostHistory([variations[0].content]);
        setHistoryIndex(0);
      } else {
        console.error("Parsed data does not contain variations:", data);
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error('Error generating full post:', error);
      handleApiError(error, 'Failed to generate content. Please try again.');
    } finally {
      setIsGeneratingFullPost(false);
    }
  };

  const handleRegenerateVariation = async (index: number) => {
    if (!selectedDay) return;
    setIsGeneratingVariation(index);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const productContext = getProductContext(productName);
      
      const prompt = `${MYANMAR_STRATEGIST_PROMPT}
      
      Regenerate a single social media post variation for Day ${selectedDay.day} of our ${daysCount}-day campaign.
      
      Product: "${productName}"
      Product Benefits: "${productBenefits}"
      Desired Emotional Response: "${emotionalResponse}"
      Target Audience: "${targetAudience}"
      Campaign Goal: "${campaignGoal}"
      Framework: "${framework}"
      Tone / Content Style: "${tone}"
      Platform: "${platform}"
      Content Pillars: "${contentPillars}"
      CTA Style: "${ctaStyle}"
      ${productContext ? `\nCRITICAL PRODUCT KNOWLEDGE:\n${productContext}\nEnsure the caption accurately reflects how and where the product is used.` : ''}
      
      Post Details:
      Title: ${selectedDay.title}
      Format: ${selectedDay.format}
      Hook: ${selectedDay.hook}
      Summary: ${selectedDay.summary}
      
      CRITICAL INSTRUCTIONS FOR A HIGH-CONVERTING POST:
      1. LANGUAGE: Write the ENTIRE caption perfectly in the Myanmar (Burmese) language. Ensure natural phrasing and cultural relevance.
      2. FRAMEWORK EXECUTION: You MUST strictly follow the "${framework}" copywriting framework. Structure the flow of the post exactly according to this framework to maximize engagement and conversions.
      3. TARGET AUDIENCE & CONTENT STYLE: The post MUST perfectly embody the "${tone}" style and speak directly to the "${targetAudience}". Ensure the vocabulary, pain points, desires, and cultural references are highly relatable and specific to this exact demographic. Avoid generic messaging. Do not use Gen Z slang unless the target audience is Gen Z.
      4. SPACING & READABILITY: Make the content highly readable. Use clear paragraph breaks (double spacing) between each section of the framework. Do not write a giant wall of text.
      5. EMOJIS: Include relevant, eye-catching emojis naturally throughout the text to break up paragraphs and highlight key points. Make it visually appealing for social media.
      6. NO LABELS: DO NOT include framework labels or structural words like "Hook:", "Attention:", "Interest:", "Desire:", "Action:", "Body:", or "Caption:". The text must flow naturally and be ready to copy-paste directly to social media.
      7. HASHTAGS: Include relevant, high-performing hashtags at the very end.
      8. VISUAL DIRECTION: Provide detailed visual/video instructions for the creator (these instructions should also be in Myanmar language). This MUST be returned in the separate "visualDirection" field, NOT in the "content" field.
      
      Return the response in JSON format matching this schema:
      {
        "id": "var_new",
        "title": "Variation Title (e.g. POV Hook)",
        "platform": "Platform Name",
        "content": "The actual post content...",
        "visualDirection": "Detailed visual/video instructions for the creator...",
        "explanation": "Why this hook works psychologically (in Myanmar)",
        "flags": "Any slang shelf-life flags (optional)"
      }
      `;

      const response = await withRetry(() => ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              platform: { type: Type.STRING },
              content: { type: Type.STRING },
              visualDirection: { type: Type.STRING },
              explanation: { type: Type.STRING },
              flags: { type: Type.STRING }
            },
            required: ["id", "title", "platform", "content", "visualDirection", "explanation"]
          }
        }
      }));

      let jsonStr = response.text || '{}';
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Find the first '{' or '[' to handle any leading text before JSON
      const firstBrace = jsonStr.indexOf('{');
      const firstBracket = jsonStr.indexOf('[');
      if (firstBrace !== -1 && firstBracket !== -1) {
        jsonStr = jsonStr.substring(Math.min(firstBrace, firstBracket));
      } else if (firstBrace !== -1) {
        jsonStr = jsonStr.substring(firstBrace);
      } else if (firstBracket !== -1) {
        jsonStr = jsonStr.substring(firstBracket);
      }
      
      // Find the last '}' or ']' to handle any trailing text after JSON
      const lastBrace = jsonStr.lastIndexOf('}');
      const lastBracket = jsonStr.lastIndexOf(']');
      if (lastBrace !== -1 && lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, Math.max(lastBrace, lastBracket) + 1);
      } else if (lastBrace !== -1) {
        jsonStr = jsonStr.substring(0, lastBrace + 1);
      } else if (lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, lastBracket + 1);
      }

      const data = JSON.parse(jsonStr);
      
      let variationData = data;
      if (Array.isArray(data) && data.length > 0) {
        variationData = data[0];
      } else if (data && data.variations && Array.isArray(data.variations) && data.variations.length > 0) {
        variationData = data.variations[0];
      } else if (data && typeof data === 'object') {
        // Fallback: look for any array in the object
        for (const key in data) {
          if (Array.isArray(data[key]) && data[key].length > 0 && data[key][0].content) {
            variationData = data[key][0];
            break;
          }
        }
      }

      if (variationData && variationData.content) {
        setPostVariations(prev => {
          const newVars = [...prev];
          newVars[index] = variationData;
          return newVars;
        });
        if (activeVariationIndex === index) {
          setPostHistory([variationData.content]);
          setHistoryIndex(0);
        }
      } else {
        console.error("Parsed data does not contain content:", data);
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error('Error regenerating variation:', error);
      handleApiError(error, 'Failed to regenerate variation.');
    } finally {
      setIsGeneratingVariation(-1);
    }
  };

  const applyLogoOverlay = (base64Img: string, logoBase64: string, position: string, scale: number, opacity: number): Promise<string> => {
    return new Promise((resolve) => {
      const mainImg = new Image();
      mainImg.src = base64Img;
      mainImg.onload = () => {
        const logoImg = new Image();
        logoImg.src = logoBase64;
        logoImg.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = mainImg.width;
          canvas.height = mainImg.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(base64Img);
            return;
          }

          // Draw main image
          ctx.drawImage(mainImg, 0, 0);

          // Calculate logo size
          const logoWidth = canvas.width * scale;
          const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
          
          // Calculate position
          const margin = canvas.width * 0.03;
          let x = margin;
          let y = margin;

          if (position === 'top-right') {
            x = canvas.width - logoWidth - margin;
          } else if (position === 'bottom-left') {
            y = canvas.height - logoHeight - margin;
          } else if (position === 'bottom-right') {
            x = canvas.width - logoWidth - margin;
            y = canvas.height - logoHeight - margin;
          }

          // Draw logo with opacity
          ctx.globalAlpha = opacity;
          ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
          ctx.globalAlpha = 1.0;

          resolve(canvas.toDataURL('image/png'));
        };
        logoImg.onerror = () => resolve(base64Img);
      };
      mainImg.onerror = () => resolve(base64Img);
    });
  };

  const handleStopGeneration = () => {
    isAbortedRef.current = true;
    setIsGeneratingImage(false);
    setToastMessage('Generation stopped by user.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleGenerateHooks = async () => {
    if (!selectedDay) return;
    setIsGeneratingHooks(true);
    setGeneratedHooks([]);
    setSelectedHook('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
      
      let lengthInstruction = '';
      if (headlineLength === 'Short') lengthInstruction = 'Keep them very short (1-3 words).';
      else if (headlineLength === 'Medium') lengthInstruction = 'Make them medium length (4-7 words).';
      else if (headlineLength === 'Long') lengthInstruction = 'Make them longer and descriptive (8+ words).';
      else lengthInstruction = 'Use a natural, punchy length.';

      const prompt = `${MYANMAR_STRATEGIST_PROMPT}
      
      Generate 5 different viral hook text (headline) variations for an image with this concept:
      Concept: "${selectedDay.summary}"
      Product: "${productName}"
      
      ${lengthInstruction}
      
      CRITICAL INSTRUCTIONS:
      1. Provide EXACTLY 5 variations.
      2. The ENTIRE response MUST be written perfectly in the Myanmar (Burmese) language.
      3. TARGET AUDIENCE ALIGNMENT: You MUST strictly tailor all hooks to the specific Target Audience ("${targetAudience}"). Speak directly to their specific age group, pain points, desires, and lifestyle. Do not use generic messaging.
      4. Return a JSON array of strings.`;

      const response = await withRetry(() => ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }));

      let jsonStr = response.text || '[]';
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Find the first '{' or '[' to handle any leading text before JSON
      const firstBrace = jsonStr.indexOf('{');
      const firstBracket = jsonStr.indexOf('[');
      if (firstBrace !== -1 && firstBracket !== -1) {
        jsonStr = jsonStr.substring(Math.min(firstBrace, firstBracket));
      } else if (firstBrace !== -1) {
        jsonStr = jsonStr.substring(firstBrace);
      } else if (firstBracket !== -1) {
        jsonStr = jsonStr.substring(firstBracket);
      }
      
      // Find the last '}' or ']' to handle any trailing text after JSON
      const lastBrace = jsonStr.lastIndexOf('}');
      const lastBracket = jsonStr.lastIndexOf(']');
      if (lastBrace !== -1 && lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, Math.max(lastBrace, lastBracket) + 1);
      } else if (lastBrace !== -1) {
        jsonStr = jsonStr.substring(0, lastBrace + 1);
      } else if (lastBracket !== -1) {
        jsonStr = jsonStr.substring(0, lastBracket + 1);
      }

      let result = JSON.parse(jsonStr);
      
      // Handle case where model returns an object with an array property
      if (!Array.isArray(result)) {
        if (result.hooks && Array.isArray(result.hooks)) result = result.hooks;
        else if (result.variations && Array.isArray(result.variations)) result = result.variations;
        else result = [result];
      }
      
      if (Array.isArray(result) && result.length > 0) {
        setGeneratedHooks(result);
        setSelectedHook(result[0]);
      }
    } catch (error: any) {
      console.error('Error generating hooks:', error);
      handleApiError(error, 'Failed to generate hook variations.');
    } finally {
      setIsGeneratingHooks(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!selectedDay) return;
    setIsGeneratingImage(true);
    setGenerationStep('Preparing request...');
    setGenerationProgress(0);
    isAbortedRef.current = false;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    progressIntervalRef.current = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 99) return 99;
        
        let increment = 0.1;
        if (selectedImageModel === 'gemini-2.5-flash-image') {
          increment = prev < 50 ? 0.8 : prev < 80 ? 0.4 : 0.2; // ~15s
        } else if (selectedImageModel === 'gemini-3.1-flash-image-preview') {
          increment = prev < 50 ? 0.4 : prev < 80 ? 0.2 : 0.1; // ~30s
        } else {
          increment = prev < 50 ? 0.2 : prev < 80 ? 0.1 : 0.05; // ~60s
        }
        
        return Math.min(99, prev + increment);
      });
    }, 100);

    // Don't clear images immediately to avoid blank screen during long generation
    // setGeneratedImage(''); 
    // setFinalImageWithLogo('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
      const productContext = getProductContext(productName);
      
      const modelPrompt = includeModel 
        ? `Include an 8k hyper-realistic, breathtakingly beautiful and highly attractive Korean or Chinese model. The model MUST have very light, glowing skin color and 100% life-like realistic skin texture with visible pores. DO NOT make the model look like plastic, CGI, or artificial. The model should interact naturally with the product or concept.` 
        : `Do NOT include any people or models in the image. Focus entirely on the product, environment, and typography.`;

      const hookToUse = selectedHook || selectedDay.hook;

      const getPrompt = (pName: string) => {
        const productIdentity = productImages.length > 0 
          ? `CRITICAL REQUIREMENT: CLONE THE EXACT PRODUCT FROM THE PROVIDED REFERENCE IMAGE. Do NOT invent a product based on the name "${pName}". You MUST extract the product from the provided image and place it seamlessly into the new environment without changing its shape, branding, colors, or texture. The product name "${pName}" is ONLY for context, the visual appearance MUST come 100% from the uploaded image.`
          : `Product: "${pName}".`;

        if (imageStyle === 'DGSA 1') {
          return `A professional, 8K Quality high-resolution photo of (a breathtakingly beautiful, highly attractive young Korean or Chinese Female) talent, expertly posed and holding ${pName}. The talent MUST have very light, glowing skin color and 100% life-like realistic skin texture with visible pores. DO NOT make the skin look like plastic or CGI. ${pName} is prominently featured in the foreground, sharp and in focus, with the talent subtly positioned to draw attention to it. The talent's confident expression complements the product's presence. The image is captured in a modern studio, luxurious interior, urban setting with soft, natural light, with a color palette cohesive with ${pName}'s branding. The composition is dynamic and clean, with the primary focus clearly on the product, supported by the talent's pose and gaze. Please do not change product photo. Do not change product's image and not too big in hand of lady. The lady have beautiful smile and teeth showing.\n\n${productIdentity}\nHeadline/Hook Text to Overlay: "${hookToUse}".\nText Overlay Style: "${textOverlayStyle}".\nCRITICAL: Include high-quality typography and Text Overlay in perfectly accurate Myanmar (Burmese) language related to the concept.`;
        } else if (imageStyle === 'DGSA 2') {
          return `A professional, 8K Quality high-resolution photo of (a breathtakingly handsome, highly attractive young Korean or Chinese Male) talent, expertly posed and holding ${pName}. The talent MUST have very light, glowing skin color and 100% life-like realistic skin texture with visible pores. DO NOT make the skin look like plastic or CGI. ${pName} is prominently featured in the foreground, sharp and in focus, with the talent subtly positioned to draw attention to it. The talent's confident expression complements the product's presence. The image is captured in a modern studio, luxurious interior, urban setting with soft, natural light, with a color palette cohesive with ${pName}'s branding. The composition is dynamic and clean, with the primary focus clearly on the product, supported by the talent's pose and gaze. Please do not change product photo. Do not change product's image and not too big in hand of man. The man have beautiful smile and teeth showing.\n\n${productIdentity}\nHeadline/Hook Text to Overlay: "${hookToUse}".\nText Overlay Style: "${textOverlayStyle}".\nCRITICAL: Include high-quality typography and Text Overlay in perfectly accurate Myanmar (Burmese) language related to the concept.`;
        } else if (imageStyle === 'DGSA 3') {
          return `A professional, 8K Quality high-resolution photo of (a breathtakingly beautiful, highly attractive young Korean or Chinese Female) talent, expertly posed and holding ${pName}. The talent MUST have very light, glowing skin color and 100% life-like realistic skin texture with visible pores. DO NOT make the skin look like plastic or CGI. ${pName} is prominently featured in the foreground, sharp and in focus, with the talent subtly positioned to draw attention to it. The talent's confident expression complements the product's presence. The image is captured in a modern studio, luxurious interior, urban setting with soft, natural light, with a color palette cohesive with ${pName}'s branding. The composition is dynamic and clean, with the primary focus clearly on the product, supported by the talent's pose and gaze. Please do not change product photo. Do not change product's image and not too big in hand of lady. Size 1:1.\n\n${productIdentity}\nHeadline/Hook Text to Overlay: "${hookToUse}".\nText Overlay Style: "${textOverlayStyle}".\nCRITICAL: Include high-quality typography and Text Overlay in perfectly accurate Myanmar (Burmese) language related to the concept.`;
        } else if (imageStyle === 'DGSA 4') {
          return `A professional, 8K Quality high-resolution photo of (a breathtakingly handsome, highly attractive young Korean or Chinese Male) talent, expertly posed and holding ${pName}. The talent MUST have very light, glowing skin color and 100% life-like realistic skin texture with visible pores. DO NOT make the skin look like plastic or CGI. ${pName} is prominently featured in the foreground, sharp and in focus, with the talent subtly positioned to draw attention to it. The talent's confident expression complements the product's presence. The image is captured in a modern studio, luxurious interior, urban setting with soft, natural light, with a color palette cohesive with ${pName}'s branding. The composition is dynamic and clean, with the primary focus clearly on the product, supported by the talent's pose and gaze. Please do not change product photo. Do not change product's image and not too big in hand of man. Size 1:1.\n\n${productIdentity}\nHeadline/Hook Text to Overlay: "${hookToUse}".\nText Overlay Style: "${textOverlayStyle}".\nCRITICAL: Include high-quality typography and Text Overlay in perfectly accurate Myanmar (Burmese) language related to the concept.`;
        } else if (imageStyle === 'DGSA 5') {
          return `A professional, 8K Quality high-resolution photo of (a breathtakingly beautiful young Korean or Chinese Female and a highly attractive young Korean or Chinese Male) talent, expertly posed and holding ${pName}. The talent MUST have very light, glowing skin color and 100% life-like realistic skin texture with visible pores. DO NOT make the skin look like plastic or CGI. ${pName} is prominently featured in the foreground, sharp and in focus, with the talent subtly positioned to draw attention to it. The talent's confident expression complements the product's presence. The image is captured in a modern studio, luxurious interior, urban setting with soft, natural light, with a color palette cohesive with ${pName}'s branding. The composition is dynamic and clean, with the primary focus clearly on the product, supported by the talent's pose and gaze. Please do not change product photo. Do not change product's image and not too big in hand of talent. The talent have beautiful smile and teeth showing.\n\n${productIdentity}\nHeadline/Hook Text to Overlay: "${hookToUse}".\nText Overlay Style: "${textOverlayStyle}".\nCRITICAL: Include high-quality typography and Text Overlay in perfectly accurate Myanmar (Burmese) language related to the concept.`;
        } else if (imageStyle === 'DGSA 6') {
          return `A professional, 8K Quality high-resolution photo of (a breathtakingly beautiful young Korean or Chinese Female and a highly attractive young Korean or Chinese Male) talent, expertly posed and holding ${pName}. The talent MUST have very light, glowing skin color and 100% life-like realistic skin texture with visible pores. DO NOT make the skin look like plastic or CGI. ${pName} is prominently featured in the foreground, sharp and in focus, with the talent subtly positioned to draw attention to it. The talent's confident expression complements the product's presence. The image is captured in a modern studio, luxurious interior, urban setting with soft, natural light, with a color palette cohesive with ${pName}'s branding. The composition is dynamic and clean, with the primary focus clearly on the product, supported by the talent's pose and gaze. Please do not change product photo. Do not change product's image and not too big in hand of talent. Size 1:1.\n\n${productIdentity}\nHeadline/Hook Text to Overlay: "${hookToUse}".\nText Overlay Style: "${textOverlayStyle}".\nCRITICAL: Include high-quality typography and Text Overlay in perfectly accurate Myanmar (Burmese) language related to the concept.`;
        }

        return `A masterpiece commercial product photography shot. 8K resolution, hyper-realistic, life-like, ultra-detailed, high-end studio lighting.
      
      CRITICAL QUALITY RULE: The entire image, especially the product and any environment, MUST look 100% realistic and life-like. DO NOT use a "plastic", artificial, or cheap 3D render look. Use cinematic, natural lighting with realistic shadows, reflections, and textures.
      
      ${productIdentity}
      
      Product Benefits: ${productBenefits || 'Enhances natural beauty'}.
      Desired Emotional Response: ${emotionalResponse || 'Luxurious and confident'}.
      Concept: ${selectedDay.summary}. 
      Headline/Hook Text to Overlay: "${hookToUse}".
      Text Overlay Style: "${textOverlayStyle}".
      Style: ${imageStyle}.
      ${modelPrompt}
      ${productContext ? `\nCRITICAL PRODUCT RULES:\n${productContext}\nIf the model is interacting with the product, they MUST apply it ONLY to the 'Target Area' specified above. DO NOT show body products being applied to the face.` : ''}
      CRITICAL: Include high-quality typography and Text Overlay in perfectly accurate Myanmar (Burmese) language related to the concept. The typography MUST strictly follow the "${textOverlayStyle}" style. The Myanmar text MUST be spelled correctly and rendered flawlessly with high-fidelity text rendering. Ensure professional font integration and seamless blending of the text with the overall image design.
      Luxurious feel, suitable for ${platform} marketing.`;
      };

      let finalPromptText = getPrompt(productName);
      if (productImages.length > 0) {
        finalPromptText = "CORE INSTRUCTION: Use the provided image as the ABSOLUTE visual reference for the product. Recreate the product's EXACT appearance, size, and branding details perfectly in this new context. \n\n" + finalPromptText;
      }
      finalPromptText += `\n\nGeneration ID: ${Date.now()}_${Math.random().toString(36).substring(7)}`;

      const generateWithModel = async (modelName: string, config: any, retries = 2, usePlatformKey = false, customParts?: any[]) => {
        if (isAbortedRef.current) throw new Error('ABORTED');
        console.log(`Generating with ${modelName}...`);
        setGenerationStep(`Generating with ${modelName.split('-')[1].toUpperCase()}...`);
        
        const currentAi = usePlatformKey 
          ? new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string })
          : ai;

        return await withRetry(() => {
          if (isAbortedRef.current) throw new Error('ABORTED');
          return currentAi.models.generateContent({
            model: modelName,
            contents: {
              parts: customParts || parts,
            },
            config: config
          });
        }, retries);
      };

      const parts: any[] = [];
      if (productImages.length > 0) {
        const match = productImages[0].match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2]
            }
          });
        }
      }
      parts.push({ text: finalPromptText });

      let response;
      try {
        // Try Selected Model first
        const imageConfig: any = {
          aspectRatio: aspectRatio as any,
        };
        if (selectedImageModel !== 'gemini-2.5-flash-image') {
          imageConfig.imageSize = (selectedImageModel === 'gemini-3-pro-image-preview' && imageSize === '512px') ? '1K' : imageSize as any;
        }

        response = await generateWithModel(selectedImageModel, {
          imageConfig: imageConfig,
        }, 2);
      } catch (primaryError: any) {
        if (primaryError.message === 'ABORTED') return;
        
        // Check for refusal in the error message
        const isRefusal = primaryError.message?.toLowerCase().includes('refused') || 
                         primaryError.message?.toLowerCase().includes('unable to generate') ||
                         primaryError.message?.toLowerCase().includes('policy');

        if (isRefusal) {
          setGenerationStep('Handling refusal (genericizing prompt)...');
          console.warn('Model refused branded prompt, attempting genericized prompt...');
          const genericProductName = productName.toLowerCase().includes('nu skin') 
            ? 'high-tech premium beauty device' 
            : 'premium skincare product';
          
          const genericPrompt = getPrompt(genericProductName);
          const genericParts = [...parts];
          genericParts[genericParts.length - 1] = { text: genericPrompt };
          
          try {
            const genericImageConfig: any = {
              aspectRatio: aspectRatio as any,
            };
            if (selectedImageModel !== 'gemini-2.5-flash-image') {
              genericImageConfig.imageSize = (selectedImageModel === 'gemini-3-pro-image-preview' && imageSize === '512px') ? '1K' : imageSize as any;
            }

            response = await generateWithModel(selectedImageModel, {
              imageConfig: genericImageConfig,
            }, 1, false, genericParts);
          } catch (e) {
            console.error('Genericized prompt also failed:', e);
            throw primaryError; // Throw original error if generic also fails
          }
        } else {
          console.error('Primary model failed after retries:', primaryError);
          throw primaryError;
        }
      }

      if (isAbortedRef.current) return;
      setGenerationStep('Processing image data...');

      if (!response) {
        throw new Error('All image generation models failed to respond.');
      }

      let base64Image = null;
      let textResponse = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          base64Image = `data:image/png;base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          textResponse += part.text;
        }
      }

      if (!base64Image) {
        if (textResponse) {
          throw new Error(`Model refused to generate image: ${textResponse.substring(0, 100)}${textResponse.length > 100 ? '...' : ''}`);
        } else {
          throw new Error('No image generated by the model.');
        }
      }

      setGeneratedImage(base64Image);
      
      // Apply logo overlay if provided
      if (logoImage) {
        const withLogo = await applyLogoOverlay(base64Image, logoImage, logoPosition, logoScale, logoOpacity);
        setFinalImageWithLogo(withLogo);
      } else {
        setFinalImageWithLogo(base64Image);
      }
    } catch (error: any) {
      if (error.message === 'ABORTED') return;
      console.error('Error generating image:', error);
      handleApiError(error, 'Failed to generate image.');
      // If it fails and we have no image at all, clear states
      if (!generatedImage) {
        setGeneratedImage('');
        setFinalImageWithLogo('');
      }
    } finally {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setGenerationProgress(100);
      if (!isAbortedRef.current) {
        setIsGeneratingImage(false);
      }
    }
  };

  const handleBackToPlan = () => {
    setSelectedDay(null);
    setPostVariations([]);
    setActiveVariationIndex(0);
    setGeneratedImage('');
    setIsImageGenView(false);
    setGenerationAttempt(0);
    setPostHistory([]);
    setHistoryIndex(-1);
  };

  if (isCheckingKey) {
    return (
      <main className="flex-1 w-full min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!hasKey) {
    return (
      <main className="flex-1 w-full min-h-screen flex flex-col items-center justify-center p-4 relative bg-background transition-colors duration-300">
        <SakuraFalling />
        <div className="glass border border-border rounded-3xl shadow-2xl p-12 max-w-md w-full text-center relative z-10 card-hover">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Key className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-4xl text-foreground mb-4 tracking-tight">API Key Required</h1>
          <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
            To use the high-quality Nano Banana 2 image model, please select your paid Google Cloud API key.
          </p>
          <button
            onClick={handleSelectKey}
            className="w-full btn-premium-chrome py-5 px-8 rounded-2xl text-lg transition-all"
          >
            Select API Key
          </button>
          <p className="text-sm text-muted-foreground mt-8">
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-primary transition-colors">
              Learn more about billing
            </a>
          </p>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // IMAGE GENERATOR VIEW (NEW PAGE)
  // ---------------------------------------------------------------------------
  if (selectedDay && isImageGenView) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative min-h-screen bg-background transition-colors duration-300">
        <SakuraFalling />
        
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsImageGenView(false)}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Back to Post Content"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-serif text-xl hidden sm:block">4K Design Studio</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectKey}
              className="p-2.5 rounded-xl glass border border-border hover:bg-muted transition-all text-foreground"
              title="Change API Key"
            >
              <Key className="w-5 h-5" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        <div className="pt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Settings */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="glass border border-border rounded-3xl shadow-xl p-8 card-hover">
              <h2 className="font-serif text-2xl text-foreground mb-8 flex items-center gap-3">
                <Settings className="w-6 h-6 text-primary/60" /> Studio Controls
              </h2>
              
              <div className="space-y-8">
                {/* Hook Generation Section */}
                <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Hook Text (Headline)</label>
                    <select
                      value={headlineLength}
                      onChange={(e) => setHeadlineLength(e.target.value)}
                      className="text-[10px] bg-background border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="Default">Default Length</option>
                      <option value="Short">Short (1-3 words)</option>
                      <option value="Medium">Medium (4-7 words)</option>
                      <option value="Long">Long (8+ words)</option>
                    </select>
                  </div>
                  
                  {generatedHooks.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {generatedHooks.map((hook, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setSelectedHook(hook)}
                          className={`w-full text-left p-3 text-xs rounded-xl border transition-all ${selectedHook === hook ? 'bg-primary/10 border-primary text-foreground shadow-sm' : 'bg-background/50 border-border/50 text-muted-foreground hover:border-border hover:bg-background'}`}
                        >
                          {hook}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground italic mb-4 px-1">
                      Generate hook variations to overlay on your image.
                    </div>
                  )}
                  
                  <button
                    onClick={handleGenerateHooks}
                    disabled={isGeneratingHooks}
                    className="w-full py-3 px-4 bg-background border border-border rounded-xl text-xs font-semibold text-foreground hover:bg-muted transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm active:scale-[0.98]"
                  >
                    {isGeneratingHooks ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-primary" />}
                    {generatedHooks.length > 0 ? 'Regenerate Hooks' : 'Generate Hook Variations'}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Content Style / Vibe</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Gen Z / Trendy & Viral">Gen Z / Trendy & Viral</option>
                    <option value="Elegant & Anti-Aging Focus (Age 30-50)">Elegant & Anti-Aging Focus (Age 30-50)</option>
                    <option value="Scientific & Dermatologist-Approved">Scientific & Dermatologist-Approved</option>
                    <option value="Busy Mom / Time-Saving Beauty">Busy Mom / Time-Saving Beauty</option>
                    <option value="Luxury Spa Experience">Luxury Spa Experience</option>
                    <option value="Natural & Organic (Clean Beauty)">Natural & Organic (Clean Beauty)</option>
                    <option value="Glowing & Youthful (Aspirational)">Glowing & Youthful (Aspirational)</option>
                    <option value="Direct & Results-Driven">Direct & Results-Driven</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Text Overlay Style</label>
                  <select 
                    value={textOverlayStyle} 
                    onChange={(e) => setTextOverlayStyle(e.target.value)} 
                    className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Elegant & Bold (High-end, thick, sophisticated typography)">Elegant & Bold</option>
                    <option value="Cinematic Style (Dramatic, movie-poster, epic lighting)">Cinematic Style</option>
                    <option value="Modern Tech & SaaS (Clean sans-serif, Apple-style, futuristic)">Modern Tech & SaaS</option>
                    <option value="Luxury Editorial (High-contrast serif, Vogue-style, refined)">Luxury Editorial</option>
                    <option value="Streetwear & Urban (Edgy, textured, distressed fonts, hypebeast)">Streetwear & Urban</option>
                    <option value="3D Bubble & Pop (Colorful, energetic, playful 3D lettering)">3D Bubble & Pop</option>
                    <option value="Minimalist Corporate (Professional, clean, trustworthy)">Minimalist Corporate</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Aspect Ratio</label>
                    <select 
                      value={aspectRatio} 
                      onChange={(e) => setAspectRatio(e.target.value)} 
                      className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="1:1">1:1 Square</option>
                      <option value="9:16">9:16 Vertical</option>
                      <option value="16:9">16:9 Landscape</option>
                    </select>
                  </div>
                
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Image Style</label>
                  <select 
                    value={imageStyle} 
                    onChange={(e) => setImageStyle(e.target.value)} 
                    className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Photorealistic">Photorealistic</option>
                    <option value="Professional Graphic Design">Professional Graphic Design</option>
                    <option value="High-End Commercial Photography">High-End Commercial Photography</option>
                    <option value="Cinematic 3D Masterpiece">Cinematic 3D Masterpiece</option>
                    <option value="DGSA 1">DGSA 1 (Korean/Chinese Female, Smile)</option>
                    <option value="DGSA 2">DGSA 2 (Korean/Chinese Male, Smile)</option>
                    <option value="DGSA 3">DGSA 3 (Korean/Chinese Female, 1:1)</option>
                    <option value="DGSA 4">DGSA 4 (Korean/Chinese Male, 1:1)</option>
                    <option value="DGSA 5">DGSA 5 (Korean/Chinese Female & Male, Smile)</option>
                    <option value="DGSA 6">DGSA 6 (Korean/Chinese Female & Male, 1:1)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Quality</label>
                  <select 
                    value={imageSize} 
                    onChange={(e) => setImageSize(e.target.value)} 
                    className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="512px">512px</option>
                    <option value="1K">1K HD</option>
                    <option value="2K">2K QHD</option>
                    <option value="4K">4K UHD</option>
                  </select>
                </div>
              </div>

                <div className="pt-6 border-t border-border">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4 ml-1">Logo Overlay (Optional)</label>
                  <div className="space-y-4">
                    {!logoImage ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <p className="text-xs font-medium text-muted-foreground">Upload PNG Logo</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setLogoImage(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    ) : (
                      <div className="relative group p-4 bg-muted/30 rounded-2xl border border-border">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 bg-background rounded-xl shadow-sm p-2">
                            <NextImage 
                              src={logoImage} 
                              alt="Logo" 
                              fill 
                              className="object-contain p-2" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-foreground">Logo Active</p>
                            <p className="text-[10px] text-muted-foreground">Will be overlaid on generation</p>
                          </div>
                          <button 
                            onClick={() => setLogoImage('')}
                            className="p-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-xl transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="space-y-2">
                            <label className="block text-[9px] uppercase font-bold text-muted-foreground">Position</label>
                            <select 
                              value={logoPosition} 
                              onChange={(e) => setLogoPosition(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                              <option value="top-left">Top Left</option>
                              <option value="top-right">Top Right</option>
                              <option value="bottom-left">Bottom Left</option>
                              <option value="bottom-right">Bottom Right</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[9px] uppercase font-bold text-muted-foreground">Scale</label>
                            <input 
                              type="range" min="0.05" max="0.4" step="0.01" 
                              value={logoScale} 
                              onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                              className="w-full accent-primary h-1.5 bg-muted rounded-full appearance-none cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div 
                  className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    includeModel 
                      ? 'bg-gradient-to-br from-primary/10 to-transparent border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.1)]' 
                      : 'bg-muted/30 border-border hover:bg-muted/50'
                  }`}
                  onClick={() => setIncludeModel(!includeModel)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      includeModel ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-foreground cursor-pointer block">
                        Include Human Model
                      </label>
                      <p className={`text-[10px] font-medium mt-0.5 transition-colors ${
                        includeModel ? 'text-primary/80' : 'text-muted-foreground'
                      }`}>
                        Adds a hyper-realistic, life-like 8K model to the scene.
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in ml-4">
                    <input 
                      type="checkbox" 
                      name="toggle" 
                      id="includeModelToggle" 
                      checked={includeModel}
                      readOnly
                      className="sr-only peer"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                      includeModel ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}></div>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                      includeModel ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">AI Engine</label>
                  <select 
                    value={selectedImageModel}
                    onChange={(e) => setSelectedImageModel(e.target.value)}
                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-2xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="gemini-3-pro-image-preview">Nano Banana Pro (Recommended)</option>
                    <option value="gemini-3.1-flash-image-preview">Nano Banana 2 (Experimental)</option>
                    <option value="gemini-2.5-flash-image">Nano Banana (Fastest)</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-border flex gap-3">
                  <button 
                    onClick={handleGenerateImage} 
                    disabled={isGeneratingImage} 
                    className="flex-1 btn-premium-chrome py-5 px-8 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-primary/20"
                  >
                    {isGeneratingImage ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                    <span className="text-lg font-bold">{isGeneratingImage ? 'Generating...' : 'Generate 4K Asset'}</span>
                  </button>
                  
                  {isGeneratingImage && (
                    <button 
                      onClick={handleStopGeneration}
                      className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-white p-5 rounded-2xl shadow-sm transition-all flex items-center justify-center"
                      title="Stop Generation"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Result */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <div className="bg-white dark:bg-[#191919] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-8 min-h-[500px] flex flex-col items-center justify-center relative group">
              {isGeneratingImage && !finalImageWithLogo && (
                <div className="flex flex-col items-center gap-4 text-neutral-500 w-full max-w-md">
                  <Loader2 className="w-12 h-12 animate-spin" />
                  <p className="font-medium animate-pulse">{generationStep || 'Generating your visual asset...'}</p>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2.5 mt-4 overflow-hidden">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${Math.round(generationProgress)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">{Math.round(generationProgress)}%</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2">
                    Estimated time: {selectedImageModel === 'gemini-2.5-flash-image' ? '10-15s' : selectedImageModel === 'gemini-3.1-flash-image-preview' ? '20-30s' : '60-80s'}
                  </p>
                </div>
              )}
              
              {finalImageWithLogo && (
                <div className={`relative w-full rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 ${aspectRatio === '9:16' ? 'max-w-md mx-auto aspect-[9/16]' : aspectRatio === '16:9' ? 'aspect-video' : 'max-w-xl mx-auto aspect-square'}`}>
                  <NextImage 
                    src={finalImageWithLogo} 
                    alt="Generated visual" 
                    fill 
                    className={`object-cover transition-opacity duration-500 ${isGeneratingImage ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`} 
                    referrerPolicy="no-referrer"
                  />
                  
                  {isGeneratingImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-900/80 backdrop-blur-[2px] z-20 rounded-xl">
                      <div className="relative">
                        <Loader2 className="w-12 h-12 animate-spin text-white" />
                        <div className="absolute inset-0 animate-pulse bg-white/20 rounded-full blur-xl"></div>
                      </div>
                      <div className="text-center w-full max-w-[80%]">
                        <p className="text-white font-serif italic text-lg mb-1 drop-shadow-md">{generationStep || 'Creating your visual...'}</p>
                        <div className="w-full bg-white/20 rounded-full h-1.5 my-3 overflow-hidden">
                          <div 
                            className="bg-white h-1.5 rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${Math.round(generationProgress)}%` }}
                          ></div>
                        </div>
                        <p className="text-white/80 text-xs font-mono mb-2">{Math.round(generationProgress)}%</p>
                        <p className="text-white/60 text-[10px] uppercase tracking-widest">
                          Estimated time: {selectedImageModel === 'gemini-2.5-flash-image' ? '10-15s' : selectedImageModel === 'gemini-3.1-flash-image-preview' ? '20-30s' : '60-80s'}
                        </p>
                      </div>
                      <button 
                        onClick={handleStopGeneration}
                        className="mt-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest transition-all border border-white/20"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {!isGeneratingImage && (
                    <div className="absolute inset-0 bg-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <a 
                        href={finalImageWithLogo} 
                        download={`day-${selectedDay.day}-${productName.replace(/\s+/g, '-').toLowerCase()}.png`} 
                        className="btn-premium-chrome px-8 py-4 rounded-full font-medium flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Download Image
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {!isGeneratingImage && !finalImageWithLogo && (
                <div className="text-center text-neutral-800/40 dark:text-neutral-100/20">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Adjust settings and click Generate Image to see results here.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // DETAILED VIEW (NEW PAGE)
  // ---------------------------------------------------------------------------
  if (selectedDay) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative min-h-screen">
        <SakuraFalling />
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 flex items-center gap-4">
          <button
            onClick={handleSelectKey}
            className="p-2 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 shadow-sm text-neutral-900 dark:text-neutral-100 transition-all"
            title="Change API Key"
          >
            <Key className="w-5 h-5" />
          </button>
          <ThemeToggle />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button 
            onClick={handleBackToPlan}
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {daysCount}-Day Plan
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Brief & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white dark:bg-[#191919] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-8 ">
              <div className="text-sm font-bold text-neutral-500 mb-2 uppercase tracking-wider">Day {selectedDay.day}</div>
              <h1 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100 mb-6">{selectedDay.title}</h1>
              
              <div className="space-y-4 mb-8">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-800/50 dark:text-neutral-100/40 mb-1">Format</div>
                  <div className="text-neutral-900 dark:text-neutral-100 font-medium">{selectedDay.format}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-800/50 dark:text-neutral-100/40 mb-1">Hook</div>
                  <div className="text-neutral-900 dark:text-neutral-100 italic">&quot;{selectedDay.hook}&quot;</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-800/50 dark:text-neutral-100/40 mb-1">Summary</div>
                  <div className="text-neutral-900/80 dark:text-neutral-100/80 text-sm leading-relaxed">{selectedDay.summary}</div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-100/10">
                <button
                  onClick={handleGenerateFullPost}
                  disabled={isGeneratingFullPost}
                  className="relative overflow-hidden w-full btn-premium-chrome py-4 px-6 rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingFullPost && (
                    <div className="absolute bottom-0 left-0 h-1 bg-white/20 dark:bg-black/20 w-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-white dark:bg-black w-1/3 rounded-full"
                        animate={{ x: ['-100%', '300%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                    </div>
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isGeneratingFullPost ? <Loader2 className="w-5 h-5 animate-spin" /> : postVariations.length > 0 ? <RefreshCw className="w-5 h-5" /> : <PenTool className="w-5 h-5" />}
                    {isGeneratingFullPost ? 'Generating...' : postVariations.length > 0 ? 'Regenerate All Variations' : 'Generate Full Post'}
                  </span>
                </button>
                
                <button
                  onClick={() => setIsImageGenView(true)}
                  disabled={postVariations.length === 0 || isGeneratingFullPost}
                  className="w-full btn-premium-silver py-4 px-6 rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ImageIcon className="w-5 h-5" />
                  Proceed to Image Generation
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Generated Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Content Result */}
            {(postVariations.length > 0 || isGeneratingFullPost) && (
              <div className="bg-white dark:bg-[#191919] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-8 min-h-[400px] ">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-neutral-400" /> Post Variations
                  </h2>
                  
                  {!isGeneratingFullPost && postVariations.length > 0 && (
                    <div className="flex gap-2">
                      {isEditingPost ? (
                        <>
                          <button
                            onClick={handleUndo}
                            disabled={historyIndex <= 0}
                            className="p-2 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/20 rounded-full transition-colors disabled:opacity-30"
                            title="Undo"
                          >
                            <Undo className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleRedo}
                            disabled={historyIndex >= postHistory.length - 1}
                            className="p-2 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/20 rounded-full transition-colors disabled:opacity-30"
                            title="Redo"
                          >
                            <Redo className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setIsEditingPost(false)}
                            className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
                            title="Done Editing"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsEditingPost(true)}
                            className="p-2 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/20 rounded-full transition-colors"
                            title="Edit Post"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCopyPost()}
                            className="p-2 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/20 rounded-full transition-colors"
                            title="Copy Post"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {isGeneratingFullPost ? (
                  <div className="flex flex-col items-center justify-center text-neutral-300 dark:text-neutral-100/20 py-20">
                    <Loader2 className="w-10 h-10 animate-spin-slow mb-4" />
                    <p className="font-serif italic text-lg">Writing your masterpiece...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-100/10 pb-4">
                      {postVariations.map((variation, idx) => (
                        <button
                          key={`${variation.id}-${idx}`}
                          onClick={() => {
                            setActiveVariationIndex(idx);
                            setIsEditingPost(false);
                            setPostHistory([variation.content]);
                            setHistoryIndex(0);
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
                            activeVariationIndex === idx
                              ? 'btn-premium-chrome'
                              : 'bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                          }`}
                        >
                          {variation.title}
                          {isGeneratingVariation === idx && <Loader2 className="w-3 h-3 animate-spin" />}
                        </button>
                      ))}
                    </div>

                    {/* Active Variation Content */}
                    <div className="prose prose-stone dark:prose-invert max-w-none text-neutral-900/80 dark:text-neutral-100/80 font-sans leading-relaxed selection:bg-neutral-200 dark:selection:bg-neutral-900">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                            {postVariations[activeVariationIndex]?.platform}
                          </span>
                          {postVariations[activeVariationIndex]?.flags && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                              {postVariations[activeVariationIndex]?.flags}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRegenerateVariation(activeVariationIndex)}
                          disabled={isGeneratingVariation !== -1}
                          className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-neutral-600 transition-colors flex items-center gap-1"
                        >
                          <RefreshCw className={`w-3 h-3 ${isGeneratingVariation === activeVariationIndex ? 'animate-spin' : ''}`} />
                          Regenerate this variation
                        </button>
                      </div>

                      {isEditingPost ? (
                        <textarea
                          value={postVariations[activeVariationIndex]?.content || ''}
                          onChange={(e) => {
                            const newContent = e.target.value;
                            setPostVariations(prev => {
                              const newVars = [...prev];
                              newVars[activeVariationIndex] = { ...newVars[activeVariationIndex], content: newContent };
                              return newVars;
                            });
                          }}
                          className="w-full h-[300px] p-4 bg-transparent border border-neutral-200 dark:border-neutral-100/10 rounded-xl focus:outline-none focus:border-neutral-500 transition-all resize-y text-sm"
                        />
                      ) : (
                        <div className="space-y-6">
                          <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-100 dark:border-neutral-100/5">
                            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Strategy Insight</div>
                            <p className="text-xs italic">{postVariations[activeVariationIndex]?.explanation}</p>
                          </div>
                          <Markdown>{postVariations[activeVariationIndex]?.content || ''}</Markdown>
                          
                          {postVariations[activeVariationIndex]?.visualDirection && (
                            <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-100/10">
                              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-3">
                                <Camera className="w-3 h-3" />
                                Visual Direction
                              </div>
                              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                {postVariations[activeVariationIndex]?.visualDirection}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {postVariations.length === 0 && !isGeneratingFullPost && !generatedImage && !isGeneratingImage && (
               <div className="bg-white dark:bg-[#191919] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-neutral-300 dark:text-neutral-100/20 text-center">
                 <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                 <p className="font-serif italic text-xl max-w-sm">Generate the full post or visual asset to see it here.</p>
               </div>
            )}
          </motion.div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // DASHBOARD VIEW (DYNAMIC PLAN)
  // ---------------------------------------------------------------------------
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative min-h-screen bg-background transition-colors duration-300">
      <SakuraFalling />
      
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 flex items-center gap-3">
        <button
          onClick={handleSelectKey}
          className="p-2.5 rounded-xl glass border border-border hover:bg-muted transition-all text-foreground"
          title="Change API Key"
        >
          <Key className="w-5 h-5" />
        </button>
        <ThemeToggle />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 pt-10"
      >
        <h1 className="font-serif text-6xl md:text-8xl text-foreground mb-8 tracking-tighter leading-[0.85]">
          Princess&apos;s Viral <br className="hidden md:block" />
          <span className="italic font-light bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] animate-[shimmer_3s_infinite_linear]">Campaign Studio</span>
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light tracking-tight leading-relaxed">
          Configure your strategy. Generate a {daysCount}-day blueprint. <br className="hidden sm:block" />
          Expand each day into viral, high-fidelity Myanmar content.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 space-y-8"
        >
          <div className="glass border border-border rounded-3xl shadow-2xl p-8 card-hover">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-2xl text-foreground flex items-center gap-3">
                <Target className="w-6 h-6 text-primary/60" />
                Campaign Settings
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLoadSettings}
                  className="p-2.5 text-muted-foreground hover:bg-muted rounded-xl transition-all hover:text-foreground"
                  title="Load Settings"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="p-2.5 text-muted-foreground hover:bg-muted rounded-xl transition-all hover:text-foreground"
                  title="Save Settings"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {toastMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-3 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs rounded-xl text-center border border-neutral-200 dark:border-neutral-800/50"
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleGeneratePlan} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Glow Up Skincare Set"
                  className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Product Images (Bulk Upload & Auto-Analyze)</label>
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl border border-border overflow-hidden group shadow-sm">
                      <NextImage 
                        src={img} 
                        alt={`Product ${idx}`} 
                        fill 
                        className="object-cover transition-transform group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                      />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-destructive/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="cursor-pointer flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-border hover:bg-muted/50 transition-all group">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                    <Upload className="w-6 h-6 text-muted-foreground group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] uppercase font-bold text-muted-foreground mt-1">Add</span>
                  </label>
                </div>
              </div>
              <div className="pt-2 pb-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleGenerateAllOptions}
                  disabled={isGeneratingOptions || !productName}
                  className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest btn-premium-silver disabled:opacity-50 overflow-hidden shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  {isGeneratingOptions ? <Loader2 className="w-3.5 h-3.5 animate-spin relative z-10" /> : <Wand2 className="w-3.5 h-3.5 relative z-10" />}
                  <span className="relative z-10">အလိုအလျောက် ဖန်တီးမည် (Auto-Generate)</span>
                </button>
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Product Benefits</label>
                <input
                  type="text"
                  value={productBenefits}
                  onChange={(e) => setProductBenefits(e.target.value)}
                  placeholder="e.g., အသားအရေကြည်လင်စေတယ်၊ အမဲစက်ပျောက်တယ်"
                  className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
                />
                {generatedBenefitsOptions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {generatedBenefitsOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setProductBenefits(opt)}
                        className={`text-[10px] font-bold px-4 py-2 rounded-xl border transition-all ${productBenefits === opt ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' : 'border-border text-muted-foreground hover:bg-muted hover:border-muted-foreground/30'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Desired Emotional Response</label>
                <input
                  type="text"
                  value={emotionalResponse}
                  onChange={(e) => setEmotionalResponse(e.target.value)}
                  placeholder="e.g., Confident, main character vibes"
                  className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
                />
                {generatedEmotionalOptions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {generatedEmotionalOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setEmotionalResponse(opt)}
                        className={`text-[10px] font-bold px-4 py-2 rounded-xl border transition-all ${emotionalResponse === opt ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' : 'border-border text-muted-foreground hover:bg-muted hover:border-muted-foreground/30'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Target Audience</label>
                <textarea
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Gen Z & Millennials in Yangon"
                  className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all h-24 resize-none placeholder:text-muted-foreground/30"
                  required
                />
                {generatedAudienceOptions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {generatedAudienceOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTargetAudience(opt)}
                        className={`text-[10px] font-bold px-4 py-2 rounded-xl border transition-all text-left ${targetAudience === opt ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' : 'border-border text-muted-foreground hover:bg-muted hover:border-muted-foreground/30'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Campaign Goal</label>
                <select
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(e.target.value)}
                  className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm"
                >
                  <option value="Increase brand awareness">Increase brand awareness</option>
                  <option value="Drive sales">Drive sales</option>
                  <option value="Boost engagement">Boost engagement</option>
                  <option value="Educate audience">Educate audience</option>
                  <option value="Build community">Build community</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Marketing Framework</label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm"
                >
                  <option value="AIDA (Attention, Interest, Desire, Action)">AIDA (Attention, Interest, Desire, Action)</option>
                  <option value="PAS (Problem, Agitate, Solution)">PAS (Problem, Agitate, Solution)</option>
                  <option value="StoryBrand (Character, Problem, Guide, Success)">StoryBrand (Character, Problem, Guide, Success)</option>
                  <option value="Hook, Story, Offer">Hook, Story, Offer</option>
                  <option value="FAB (Features, Advantages, Benefits)">FAB (Features, Advantages, Benefits)</option>
                  <option value="Educational & Debunking">Educational & Debunking</option>
                  <option value="Transformation (Before/After)">Transformation (Before/After)</option>
                  <option value="BAB (Before, After, Bridge)">BAB (Before, After, Bridge)</option>
                  <option value="4 C's (Clear, Concise, Compelling, Credible)">4 C&apos;s (Clear, Concise, Compelling, Credible)</option>
                  <option value="QUEST (Qualify, Understand, Educate, Stimulate, Transition)">QUEST (Qualify, Understand, Educate, Stimulate, Transition)</option>
                  <option value="PASTOR (Problem, Amplify, Story, Transformation, Offer, Response)">PASTOR (Problem, Amplify, Story, Transformation, Offer, Response)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Primary Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm"
                >
                  <option value="Instagram / TikTok (Visual-first)">Instagram / TikTok (Visual-first)</option>
                  <option value="LinkedIn (Professional)">LinkedIn (Professional)</option>
                  <option value="Twitter / X (Short-form)">Twitter / X (Short-form)</option>
                  <option value="Facebook (Community-focused)">Facebook (Community-focused)</option>
                </select>
              </div>
              
              <div className="space-y-6 pt-8 border-t border-border">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 mb-2 ml-1">Advanced Strategy</h3>
                
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Content Pillars</label>
                  <select
                    value={contentPillars}
                    onChange={(e) => setContentPillars(e.target.value)}
                    className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="Education, Lifestyle, Product Demo">Education, Lifestyle, Product Demo</option>
                    <option value="Inspiration, Behind-the-Scenes, User Generated Content (UGC)">Inspiration, Behind-the-Scenes, User Generated Content (UGC)</option>
                    <option value="Entertainment, Storytelling, Social Proof">Entertainment, Storytelling, Social Proof</option>
                    <option value="Tips & Tricks, Industry News, Community Spotlight">Tips & Tricks, Industry News, Community Spotlight</option>
                    <option value="Promotional, Educational, Entertaining (The 3 E's)">Promotional, Educational, Entertaining (The 3 E&apos;s)</option>
                    <option value="Relatable Struggle, Glow Up, Review">Relatable Struggle, Glow Up, Review</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Call-to-Action Style</label>
                  <select
                    value={ctaStyle}
                    onChange={(e) => setCtaStyle(e.target.value)}
                    className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="Engagement ရယူရန် (Save & Share လုပ်ပါ)">Engagement ရယူရန် (Save & Share လုပ်ပါ)</option>
                    <option value="ချက်ချင်းဝယ်ယူရန် (Link in Bio / အခုပဲဝယ်ယူပါ)">ချက်ချင်းဝယ်ယူရန် (Link in Bio / အခုပဲဝယ်ယူပါ)</option>
                    <option value="အပြန်အလှန်ဆွေးနွေးရန် (Comment ရေးပါ / Tag တွဲပါ)">အပြန်အလှန်ဆွေးနွေးရန် (Comment ရေးပါ / Tag တွဲပါ)</option>
                    <option value="သွယ်ဝိုက်ရောင်းချရန် (အသေးစိတ်သိရှိရန် / DM ပို့ပါ)">သွယ်ဝိုက်ရောင်းချရန် (အသေးစိတ်သိရှိရန် / DM ပို့ပါ)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Campaign Duration (Days)</label>
                    <select
                      value={daysCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setDaysCount(val);
                        setReelsCount(0);
                        setCarouselCount(0);
                      }}
                      className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm"
                    >
                      <option value={7}>7 Days</option>
                      <option value={10}>10 Days</option>
                      <option value={14}>14 Days</option>
                      <option value={21}>21 Days</option>
                      <option value={30}>30 Days</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Reels Count</label>
                    <input
                      type="number"
                      min="0"
                      max={daysCount}
                      value={reelsCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setReelsCount(Math.min(daysCount - carouselCount, Math.max(0, val)));
                      }}
                      className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Carousel Count</label>
                    <input
                      type="number"
                      min="0"
                      max={daysCount}
                      value={carouselCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setCarouselCount(Math.min(daysCount - reelsCount, Math.max(0, val)));
                      }}
                      className="w-full px-4 py-3.5 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <button
                  type="submit"
                  disabled={isGeneratingPlan || !productName || !targetAudience}
                  className="w-full btn-premium-chrome py-5 px-8 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-primary/20 group"
                >
                  {isGeneratingPlan ? <Loader2 className="w-6 h-6 animate-spin" /> : <Layout className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
                  <span className="text-lg font-bold">{isGeneratingPlan ? 'Strategizing...' : `Generate ${daysCount}-Day Outline`}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Right Column: Results (Dynamic Day Grid) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8"
        >
          <div className="bg-white dark:bg-[#191919] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-8 min-h-[600px] h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-neutral-400" />
                Campaign Blueprint
              </h2>
              {planItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleGeneratePlan(undefined, true)}
                  disabled={isGeneratingPlan}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium btn-premium-silver rounded-full disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isGeneratingPlan ? 'animate-spin' : ''}`} />
                  Regenerate Plan
                </button>
              )}
            </div>
            
            {isGeneratingPlan ? (
              <div className="h-full flex flex-col items-center justify-center text-neutral-300 dark:text-neutral-100/20 py-32">
                <Loader2 className="w-12 h-12 animate-spin-slow mb-6" />
                <p className="font-serif italic text-xl">Architecting your {daysCount}-day strategy...</p>
                <p className="text-sm mt-2 opacity-60">This may take a few moments.</p>
              </div>
            ) : planItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {planItems.map((item, idx) => (
                  <motion.div 
                    key={`${item.day}-${idx}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => setSelectedDay(item)}
                    className="bg-white dark:bg-[#191919] border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl cursor-pointer hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded-md">
                        Day {item.day}
                      </div>
                      <div className="text-[10px] text-neutral-800/50 dark:text-neutral-100/40 uppercase tracking-wider">
                        {item.format}
                      </div>
                    </div>
                    <h3 className="font-serif text-lg text-neutral-900 dark:text-neutral-100 mb-2 leading-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-900/70 dark:text-neutral-100/60 line-clamp-3 leading-relaxed">
                      <span className="font-semibold opacity-70">Hook:</span> {item.hook}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-neutral-200 dark:text-neutral-100/10 py-32 text-center">
                <Sparkles className="w-16 h-16 mb-6 opacity-20" />
                <p className="font-serif italic text-2xl max-w-sm">Configure your campaign settings to generate the blueprint.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
