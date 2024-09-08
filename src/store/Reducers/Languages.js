import { createSlice } from "@reduxjs/toolkit";

const Langs = {
    // Navbar
    home: ["Home", "الرئيسية"],
    meals: ["meals", "وجبات جاهزة"],
    calc: ["Calory Calculator", "حساب السعرات الحرارية"],
    aboutus: ["About us", "من نحن"],
    faqs: ["FAQs", "قسم الاسئلة"],

    // User
    profile: ["profile", "الصفحة الشخصية"],
    grades: ["grades", "الدرجات"],
    darkmode: ["Dark mode", "الوضع الليلي"],
    lightmode: ["Light mode", "الوضع المضئ"],
    language: ["language", "اللغة"],
    arabic: ["arabic", "اللغة العربية"],
    english: ["english", "اللغة الإنجليزية"],
    logout: ["Logout", "تسجيل الخروج"],

    // Home
    title: [
        "Welcome to the Nutri-AI system",
        "مرحبا في تطبيق الذكاء الاصطناعي نيوتري",
    ],
    sub1: [
        "An AI-System that generates a suitable meal plans that fits your preferences and body needs.",
        "واحدة من اكبر منصات الانظمة الغذائية والمتخصصة في مجال إنشاء الانظمة الغذائية المناسبة لاحتياجاتك الغذائية والبدنية.",
    ],
    sub2: [
        "You will choose your favorites and we will generate the meal.",
        "اختر طعامك المفضل واترك لنا امر وجبتك الغذائية",
    ],
    joinus: ["Generate your meal now", "انشئ نظامك الغذائي الان"],

    // Couters
    food: ["Meal", "وجبة غذائية"],
    user: ["User", "مستخدم"],
    trainer: ["trainer", "مدرب"],

    // Leaderboard
    leaderboard: ["Leaderboard", "لائحة الشرف"],
    boardQoute: ["The highest rated trainers.", "المدربون الأعلي تقييماً."],
    pt: ["pt", "نقطة"],

    // contact us
    contactus: ["contact us", "تواصل معنا"],
    contactQaute: [
        "Ask For What Ever You Need",
        "يمكنك سؤالنا عن ايا كان ما تريد",
    ],
    name: ["name", "الاسم"],
    email: ["email", "البريد الإلكتروني"],
    phone: ["phone", "رقم الهاتف"],
    message: ["message", "اشرح لنا ما تريد"],
    send: ["send your message", "إرسال رسالتك"],
};

export const Languages_trans = createSlice({
    name: "translate",
    initialState: Langs,
    reducers: {},
});

// Action creators are generated for each case reducer function
// export const { tstCode } = Languages_trans.actions;

export default Languages_trans.reducer;
