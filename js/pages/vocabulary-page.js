// =========================================================
// ZenG English Learn
// Vocabulary Learning Page
// =========================================================
//
// Beginner-friendly international English vocabulary.
// Simple explanations.
// Daily-life examples.
// Common mistakes.
// Common doubts.
// Practice included.
//
// Future vocabulary content can be added inside this file
// without changing app.js.
// =========================================================


// =========================================================
// VOCABULARY TOPICS
// =========================================================

const VOCABULARY_TOPICS = [

  {
    id: "daily-life",
    number: 1,
    title: "Daily Life",
    icon: "🏠",
    description:
      "Useful English words for everyday situations.",

    words: [

      {
        word: "Routine",
        pronunciation: "/ruːˈtiːn/",
        meaning:
          "The things you regularly do each day.",

        explanation:
          "Your routine is the usual order of activities you do every day.",

        examples: [
          "My morning routine starts at 7 o'clock.",
          "Exercise is part of my daily routine."
        ],

        usage:
          "Use routine when talking about regular daily activities.",

        commonMistake:
          "Do not use routine only for work or school. It can include any regular activity."
      },


      {
        word: "Usually",
        pronunciation: "/ˈjuːʒuəli/",
        meaning:
          "Something that happens most of the time.",

        explanation:
          "Usually means something happens often, but not every single time.",

        examples: [
          "I usually have breakfast at home.",
          "She usually walks to work."
        ],

        usage:
          "Usually is useful when talking about habits and regular activities.",

        commonMistake:
          "Usually does not mean always. Something can happen usually but sometimes be different."
      },


      {
        word: "Borrow",
        pronunciation: "/ˈbɒrəʊ/",
        meaning:
          "To take something from someone for a while and return it later.",

        explanation:
          "When you borrow something, you receive it temporarily and plan to give it back.",

        examples: [
          "Can I borrow your pen?",
          "I borrowed a book from my friend."
        ],

        usage:
          "Use borrow when you receive something temporarily from another person.",

        commonMistake:
          "Borrow means you take something. Lend means you give something temporarily."
      },


      {
        word: "Lend",
        pronunciation: "/lend/",
        meaning:
          "To give something to someone for a while and expect it back.",

        explanation:
          "When you lend something, you give it temporarily to another person.",

        examples: [
          "Can you lend me your charger?",
          "I lent my friend some money."
        ],

        usage:
          "Use lend when you are the person giving the item temporarily.",

        commonMistake:
          "Do not say 'Can you borrow me your phone?' Say 'Can you lend me your phone?'"
      },


      {
        word: "Enough",
        pronunciation: "/ɪˈnʌf/",
        meaning:
          "As much as you need.",

        explanation:
          "Enough means you have the amount that is needed.",

        examples: [
          "I have enough money for lunch.",
          "We have enough chairs for everyone."
        ],

        usage:
          "Use enough when talking about a sufficient amount.",

        commonMistake:
          "Say 'enough money', not 'money enough' in normal everyday English."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between borrow and lend?",

        answer:
          "Borrow means you receive something temporarily. Lend means you give something temporarily.",

        examples: [
          "I borrowed his book.",
          "He lent me his book."
        ]
      },


      {
        question:
          "Does usually mean always?",

        answer:
          "No. Usually means most of the time. It can still be different sometimes.",

        examples: [
          "I usually drink tea, but sometimes I drink coffee."
        ]
      }

    ]

  },


  // =======================================================
  // FOOD AND DRINK
  // =======================================================

  {
    id: "food-drink",
    number: 2,
    title: "Food & Drink",
    icon: "🍎",
    description:
      "Common English words for food, drinks and eating.",

    words: [

      {
        word: "Hungry",
        pronunciation: "/ˈhʌŋɡri/",
        meaning:
          "Wanting or needing food.",

        explanation:
          "You feel hungry when your body wants food.",

        examples: [
          "I'm hungry. Let's have lunch.",
          "The children are hungry after school."
        ],

        usage:
          "Use hungry to describe the feeling of wanting food.",

        commonMistake:
          "Hungry describes a feeling. For the action, use eat."
      },


      {
        word: "Thirsty",
        pronunciation: "/ˈθɜːrsti/",
        meaning:
          "Wanting or needing something to drink.",

        explanation:
          "You feel thirsty when your body needs a drink.",

        examples: [
          "I'm thirsty. Can I have some water?",
          "We were thirsty after the walk."
        ],

        usage:
          "Use thirsty when someone wants a drink.",

        commonMistake:
          "Do not confuse thirsty with hungry. Hungry is about food; thirsty is about drinks."
      },


      {
        word: "Delicious",
        pronunciation: "/dɪˈlɪʃəs/",
        meaning:
          "Very pleasant to eat or drink.",

        explanation:
          "Use delicious when something tastes very good.",

        examples: [
          "This pizza is delicious.",
          "Your soup smells delicious."
        ],

        usage:
          "Use delicious to give a positive opinion about food or drink.",

        commonMistake:
          "Delicious is normally positive. If you do not like the taste, use words such as bad, unpleasant or tasteless."
      },


      {
        word: "Recipe",
        pronunciation: "/ˈresəpi/",
        meaning:
          "Instructions for preparing a particular food or dish.",

        explanation:
          "A recipe tells you what ingredients to use and how to prepare the food.",

        examples: [
          "I found a simple recipe online.",
          "Can you send me the recipe?"
        ],

        usage:
          "Use recipe when talking about instructions for cooking.",

        commonMistake:
          "Recipe is the instructions, not the finished food itself."
      },


      {
        word: "Taste",
        pronunciation: "/teɪst/",
        meaning:
          "The particular flavor of something, or the action of trying food or drink.",

        explanation:
          "Taste can describe flavor, or it can mean trying a small amount of food or drink.",

        examples: [
          "This soup tastes great.",
          "Can I taste your cake?"
        ],

        usage:
          "Taste can be used as both a noun and a verb.",

        commonMistake:
          "Do not confuse taste with smell. Taste comes mainly from what you experience in your mouth."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between hungry and thirsty?",

        answer:
          "Hungry means you want food. Thirsty means you want something to drink.",

        examples: [
          "I'm hungry, so I'll eat.",
          "I'm thirsty, so I'll drink some water."
        ]
      },


      {
        question:
          "Can delicious describe a drink?",

        answer:
          "Yes. Delicious can describe food and drinks.",

        examples: [
          "This juice is delicious."
        ]
      }

    ]

  },


  // =======================================================
  // HOME
  // =======================================================

  {
    id: "home",
    number: 3,
    title: "Home",
    icon: "🛋️",
    description:
      "Useful words for talking about your home and household.",

    words: [

      {
        word: "Comfortable",
        pronunciation: "/ˈkʌmftəbəl/",
        meaning:
          "Feeling relaxed and physically at ease.",

        explanation:
          "Something comfortable makes you feel relaxed rather than uncomfortable.",

        examples: [
          "This sofa is very comfortable.",
          "I feel comfortable in my new home."
        ],

        usage:
          "Use comfortable for furniture, clothes, places and situations.",

        commonMistake:
          "Comfortable describes a pleasant feeling or condition. It does not simply mean beautiful."
      },


      {
        word: "Clean",
        pronunciation: "/kliːn/",
        meaning:
          "Free from dirt or unwanted things.",

        explanation:
          "Something is clean when it does not have dirt or mess on it.",

        examples: [
          "My room is clean.",
          "Please keep the kitchen clean."
        ],

        usage:
          "Use clean to describe a place, object or condition.",

        commonMistake:
          "Clean and tidy are not exactly the same. A room can be clean but not tidy."
      },


      {
        word: "Tidy",
        pronunciation: "/ˈtaɪdi/",
        meaning:
          "Neat and organized.",

        explanation:
          "A tidy place has things arranged neatly.",

        examples: [
          "Please keep your desk tidy.",
          "Her room is always tidy."
        ],

        usage:
          "Use tidy when talking about organization and neatness.",

        commonMistake:
          "Tidy does not always mean clean. A room can be tidy but still need cleaning."
      },


      {
        word: "Repair",
        pronunciation: "/rɪˈpeər/",
        meaning:
          "To fix something that is broken or damaged.",

        explanation:
          "When something stops working properly, you repair it to make it work again.",

        examples: [
          "I need to repair my bicycle.",
          "The technician repaired the washing machine."
        ],

        usage:
          "Use repair when something is broken or damaged and needs fixing.",

        commonMistake:
          "Repair is usually used for something that is damaged or not working properly."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between clean and tidy?",

        answer:
          "Clean means free from dirt. Tidy means neat and organized.",

        examples: [
          "The floor is clean.",
          "The books are tidy on the shelf."
        ]
      }

    ]

  },


  // =======================================================
  // PEOPLE AND FRIENDS
  // =======================================================

  {
    id: "people-friends",
    number: 4,
    title: "People & Friends",
    icon: "👥",
    description:
      "Useful words for conversations about people and relationships.",

    words: [

      {
        word: "Friendly",
        pronunciation: "/ˈfrendli/",
        meaning:
          "Kind and pleasant toward other people.",

        explanation:
          "A friendly person is easy to talk to and treats people kindly.",

        examples: [
          "Our new neighbor is very friendly.",
          "The teacher was friendly and helpful."
        ],

        usage:
          "Use friendly to describe someone's behavior or personality.",

        commonMistake:
          "Friendly means kind or pleasant. It does not necessarily mean someone is your friend."
      },


      {
        word: "Polite",
        pronunciation: "/pəˈlaɪt/",
        meaning:
          "Having good manners and showing respect.",

        explanation:
          "A polite person uses respectful words and behaves appropriately.",

        examples: [
          "It is polite to say thank you.",
          "He was very polite to the waiter."
        ],

        usage:
          "Use polite when talking about respectful behavior.",

        commonMistake:
          "Being polite does not mean you agree with someone. You can disagree politely."
      },


      {
        word: "Helpful",
        pronunciation: "/ˈhelpfəl/",
        meaning:
          "Willing or able to help.",

        explanation:
          "Someone helpful makes a situation easier by giving assistance.",

        examples: [
          "My friend was very helpful.",
          "The information on this website was helpful."
        ],

        usage:
          "Helpful can describe people, information, advice or things.",

        commonMistake:
          "Helpful can describe something useful, not only a person."
      },


      {
        word: "Neighbor",
        pronunciation: "/ˈneɪbər/",
        meaning:
          "A person who lives near you.",

        explanation:
          "Your neighbors are people who live close to your home.",

        examples: [
          "Our neighbor has a friendly dog.",
          "I met my new neighbors yesterday."
        ],

        usage:
          "Use neighbor when talking about people living nearby.",

        commonMistake:
          "Neighbor refers to someone living nearby, not necessarily someone you know well."
      }

    ],

    doubts: [

      {
        question:
          "Is a friendly person automatically my friend?",

        answer:
          "No. Friendly describes someone's behavior. A friend is someone with whom you have a relationship.",

        examples: [
          "The shop assistant was friendly, but I don't know her personally."
        ]
      }

    ]

  },


  // =======================================================
  // WORK AND STUDY
  // =======================================================

  {
    id: "work-study",
    number: 5,
    title: "Work & Study",
    icon: "📚",
    description:
      "Useful words for school, learning and everyday work.",

    words: [

      {
        word: "Practice",
        pronunciation: "/ˈpræktɪs/",
        meaning:
          "To do something repeatedly so that you become better at it.",

        explanation:
          "Practice helps you improve a skill by using it again and again.",

        examples: [
          "I practice English every day.",
          "She practices the piano after school."
        ],

        usage:
          "Use practice when talking about improving a skill.",

        commonMistake:
          "Practice is usually about repeated activity. Simply knowing something is not the same as practicing it."
      },


      {
        word: "Improve",
        pronunciation: "/ɪmˈpruːv/",
        meaning:
          "To become better or make something better.",

        explanation:
          "When something improves, it becomes better than before.",

        examples: [
          "I want to improve my English.",
          "Her speaking has improved a lot."
        ],

        usage:
          "Use improve when talking about progress or making something better.",

        commonMistake:
          "Do not say 'improve better'. Improve already means become better."
      },


      {
        word: "Understand",
        pronunciation: "/ˌʌndərˈstænd/",
        meaning:
          "To know the meaning of something.",

        explanation:
          "When you understand something, you know what it means or how it works.",

        examples: [
          "I understand the question.",
          "I don't understand this word."
        ],

        usage:
          "Use understand when talking about meaning, ideas or instructions.",

        commonMistake:
          "The past form is understood, not understanded."
      },


      {
        word: "Explain",
        pronunciation: "/ɪkˈspleɪn/",
        meaning:
          "To make something clear by giving information.",

        explanation:
          "When you explain something, you help another person understand it.",

        examples: [
          "Can you explain this word?",
          "The teacher explained the lesson clearly."
        ],

        usage:
          "Use explain when someone needs information or clarification.",

        commonMistake:
          "Say 'explain something to someone', not 'explain someone something'."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between practice and improve?",

        answer:
          "Practice is the activity you do repeatedly. Improve is the result of becoming better.",

        examples: [
          "I practice English every day.",
          "My English is improving."
        ]
      },


      {
        question:
          "What is the past form of understand?",

        answer:
          "The past form is understood.",

        examples: [
          "I understand the lesson.",
          "I understood the lesson yesterday."
        ]
      }

    ]

  },


  // =======================================================
  // TRAVEL
  // =======================================================

  {
    id: "travel",
    number: 6,
    title: "Travel",
    icon: "✈️",
    description:
      "Useful English words for travel and getting around.",

    words: [

      {
        word: "Journey",
        pronunciation: "/ˈdʒɜːrni/",
        meaning:
          "The act of traveling from one place to another.",

        explanation:
          "A journey is the travel from a starting place to a destination.",

        examples: [
          "The journey took three hours.",
          "We had a long journey home."
        ],

        usage:
          "Use journey when talking about travel from one place to another.",

        commonMistake:
          "Journey focuses on the travel itself, while destination means the place you are going to."
      },


      {
        word: "Ticket",
        pronunciation: "/ˈtɪkɪt/",
        meaning:
          "A document or digital item that allows you to travel or enter somewhere.",

        explanation:
          "You may need a ticket to travel by train, bus or plane, or to enter an event.",

        examples: [
          "I bought a train ticket.",
          "Please show your ticket at the entrance."
        ],

        usage:
          "Use ticket for travel, events and other situations where entry or access is controlled.",

        commonMistake:
          "A ticket is not the same as a passport. A passport identifies you for international travel."
      },


      {
        word: "Destination",
        pronunciation: "/ˌdestɪˈneɪʃən/",
        meaning:
          "The place where you are going.",

        explanation:
          "Your destination is the final place you want to reach.",

        examples: [
          "Paris is our final destination.",
          "We reached our destination late at night."
        ],

        usage:
          "Use destination when talking about the place you are traveling to.",

        commonMistake:
          "Destination is a place, not the journey itself."
      },


      {
        word: "Explore",
        pronunciation: "/ɪkˈsplɔːr/",
        meaning:
          "To travel around or look at a place to learn more about it.",

        explanation:
          "When you explore a place, you spend time discovering it.",

        examples: [
          "We explored the city on foot.",
          "I want to explore new places."
        ],

        usage:
          "Use explore when talking about discovering places, ideas or subjects.",

        commonMistake:
          "Explore does not always mean traveling. You can also explore an idea or a topic."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between journey and destination?",

        answer:
          "A journey is the travel. A destination is the place you are traveling to.",

        examples: [
          "The journey was long.",
          "Our destination was Rome."
        ]
      }

    ]

  },


  // =======================================================
  // FEELINGS
  // =======================================================

  {
    id: "feelings",
    number: 7,
    title: "Feelings",
    icon: "😊",
    description:
      "Useful words for talking about emotions and feelings.",

    words: [

      {
        word: "Excited",
        pronunciation: "/ɪkˈsaɪtɪd/",
        meaning:
          "Very happy and interested because something is going to happen.",

        explanation:
          "You feel excited when you are looking forward to something.",

        examples: [
          "I'm excited about my trip.",
          "The children are excited about the party."
        ],

        usage:
          "Use excited for positive anticipation about something.",

        commonMistake:
          "Excited does not simply mean happy. It usually involves something happening or expected."
      },


      {
        word: "Nervous",
        pronunciation: "/ˈnɜːrvəs/",
        meaning:
          "Worried or slightly afraid about something.",

        explanation:
          "You may feel nervous before an important event or unfamiliar situation.",

        examples: [
          "I feel nervous before exams.",
          "She was nervous about her first interview."
        ],

        usage:
          "Use nervous when someone feels worried or uncertain.",

        commonMistake:
          "Nervous is different from angry. Nervous usually comes from worry or uncertainty."
      },


      {
        word: "Proud",
        pronunciation: "/praʊd/",
        meaning:
          "Feeling pleased about something you or someone else has achieved.",

        explanation:
          "You feel proud when you are happy about an achievement.",

        examples: [
          "I'm proud of my progress.",
          "Her parents are proud of her."
        ],

        usage:
          "Use proud when talking about achievements or something you value.",

        commonMistake:
          "Proud can be positive, but in some situations it can also mean someone thinks too highly of themselves."
      },


      {
        word: "Worried",
        pronunciation: "/ˈwɜːrid/",
        meaning:
          "Feeling concerned about something bad that might happen.",

        explanation:
          "When you are worried, something is making you feel concerned.",

        examples: [
          "I'm worried about my exam.",
          "She was worried about her friend."
        ],

        usage:
          "Use worried when talking about concern or fear about a situation.",

        commonMistake:
          "Worried is an adjective. Say 'I am worried', not 'I am worry'."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between excited and nervous?",

        answer:
          "Both can make you feel strong emotions before something happens. Excited is usually positive; nervous usually involves worry.",

        examples: [
          "I'm excited about the holiday.",
          "I'm nervous about the exam."
        ]
      },


      {
        question:
          "Should I say 'I am worry'?",

        answer:
          "No. Use 'I am worried' when describing your feeling.",

        examples: [
          "I am worried about the test.",
          "I worry about my future."
        ]
      }

    ]

  },


  // =======================================================
  // COMMUNICATION
  // =======================================================

  {
    id: "communication",
    number: 8,
    title: "Communication",
    icon: "💬",
    description:
      "Useful words for speaking, listening and everyday conversations.",

    words: [

      {
        word: "Agree",
        pronunciation: "/əˈɡriː/",
        meaning:
          "To have the same opinion as someone.",

        explanation:
          "If you agree with someone, you have the same or a similar opinion.",

        examples: [
          "I agree with you.",
          "We agree that this is a good idea."
        ],

        usage:
          "Use agree when talking about opinions, decisions or ideas.",

        commonMistake:
          "Say 'I agree with you', not 'I am agree with you'."
      },


      {
        word: "Suggest",
        pronunciation: "/səˈdʒest/",
        meaning:
          "To give an idea or possible choice for someone to consider.",

        explanation:
          "When you suggest something, you offer an idea without forcing someone to accept it.",

        examples: [
          "I suggest taking a taxi.",
          "She suggested a different restaurant."
        ],

        usage:
          "Use suggest when offering an idea or option.",

        commonMistake:
          "Do not normally say 'I suggest you to go'. Say 'I suggest that you go' or 'I suggest going'."
      },


      {
        word: "Mention",
        pronunciation: "/ˈmenʃən/",
        meaning:
          "To talk about something briefly.",

        explanation:
          "When you mention something, you refer to it without giving a long explanation.",

        examples: [
          "He mentioned your name.",
          "She mentioned that she was tired."
        ],

        usage:
          "Use mention when referring to something briefly.",

        commonMistake:
          "Mention does not mean explain in detail."
      },


      {
        word: "Reply",
        pronunciation: "/rɪˈplaɪ/",
        meaning:
          "To answer someone by speaking, writing or messaging.",

        explanation:
          "When you reply, you respond to what someone has said or written.",

        examples: [
          "Please reply to my message.",
          "She replied with a short answer."
        ],

        usage:
          "Use reply for messages, emails, questions and conversations.",

        commonMistake:
          "Reply focuses on responding. It does not necessarily mean giving a detailed answer."
      }

    ],

    doubts: [

      {
        question:
          "Is 'I am agree' correct?",

        answer:
          "No. Agree is a verb, so say 'I agree with you.'",

        examples: [
          "I agree with you. ✅",
          "I am agree with you. ❌"
        ]
      },


      {
        question:
          "What is the difference between answer and reply?",

        answer:
          "Answer is commonly used for questions. Reply is commonly used for responding to something someone said or wrote. They can sometimes overlap.",

        examples: [
          "Please answer my question.",
          "Please reply to my message."
        ]
      }

    ]

  },


  // =======================================================
  // TIME
  // =======================================================

  {
    id: "time",
    number: 9,
    title: "Time",
    icon: "⏰",
    description:
      "Useful words for talking about time, schedules and plans.",

    words: [

      {
        word: "Early",
        pronunciation: "/ˈɜːrli/",
        meaning:
          "Before the expected or usual time.",

        explanation:
          "If you arrive early, you arrive before the expected time.",

        examples: [
          "I arrived early for work.",
          "She usually wakes up early."
        ],

        usage:
          "Use early when something happens before the expected or usual time.",

        commonMistake:
          "Early is not always the opposite of late in every context, but it is commonly used that way for time."
      },


      {
        word: "Late",
        pronunciation: "/leɪt/",
        meaning:
          "After the expected or usual time.",

        explanation:
          "If something happens late, it happens after the expected time.",

        examples: [
          "Sorry I'm late.",
          "The bus was late."
        ],

        usage:
          "Use late when someone or something is behind the expected time.",

        commonMistake:
          "Say 'I am late', not 'I am lately' when talking about arriving after the expected time."
      },


      {
        word: "Soon",
        pronunciation: "/suːn/",
        meaning:
          "In a short time from now or shortly after another event.",

        explanation:
          "Soon means something will happen in a short amount of time.",

        examples: [
          "I'll call you soon.",
          "The bus will arrive soon."
        ],

        usage:
          "Use soon when the exact time is not important but the wait will be short.",

        commonMistake:
          "Soon does not give an exact time."
      },


      {
        word: "Already",
        pronunciation: "/ɔːlˈredi/",
        meaning:
          "Before now or before the expected time.",

        explanation:
          "Already shows that something has happened earlier than the current moment or expectation.",

        examples: [
          "I've already eaten.",
          "She has already finished her work."
        ],

        usage:
          "Use already when something has happened before now or earlier than expected.",

        commonMistake:
          "Already usually talks about something completed, while still shows something continuing."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between soon and later?",

        answer:
          "Soon means in a short time. Later means at a time after now, without saying exactly when.",

        examples: [
          "I'll call you soon.",
          "I'll call you later."
        ]
      }

    ]

  },


  // =======================================================
  // TECHNOLOGY
  // =======================================================

  {
    id: "technology",
    number: 10,
    title: "Technology",
    icon: "📱",
    description:
      "Useful English words for phones, computers and the internet.",

    words: [

      {
        word: "Download",
        pronunciation: "/ˌdaʊnˈləʊd/",
        meaning:
          "To copy something from the internet to your device.",

        explanation:
          "When you download something, it comes from an online source to your phone or computer.",

        examples: [
          "I downloaded the app yesterday.",
          "Please download the file."
        ],

        usage:
          "Use download for apps, files, photos, videos and other digital content.",

        commonMistake:
          "Download means receiving data. Upload means sending data from your device to an online service."
      },


      {
        word: "Upload",
        pronunciation: "/ˌʌpˈləʊd/",
        meaning:
          "To send something from your device to the internet or another online service.",

        explanation:
          "When you upload something, you send it from your phone or computer to an online location.",

        examples: [
          "I uploaded the photo.",
          "Please upload your document."
        ],

        usage:
          "Use upload for photos, videos, documents and other files.",

        commonMistake:
          "Do not confuse upload with download."
      },


      {
        word: "Search",
        pronunciation: "/sɜːrtʃ/",
        meaning:
          "To look for information or something you want.",

        explanation:
          "When you search, you try to find something.",

        examples: [
          "I searched for the answer online.",
          "Search for the nearest restaurant."
        ],

        usage:
          "Use search when looking for information, places, people or things.",

        commonMistake:
          "Search can be used as both a verb and a noun."
      },


      {
        word: "Password",
        pronunciation: "/ˈpɑːswɜːrd/",
        meaning:
          "A secret word or group of characters used to access an account or device.",

        explanation:
          "A password helps protect your account or device from unauthorized access.",

        examples: [
          "I forgot my password.",
          "Never share your password with strangers."
        ],

        usage:
          "Use password when talking about account or device security.",

        commonMistake:
          "A password should be kept private."
      }

    ],

    doubts: [

      {
        question:
          "What is the difference between upload and download?",

        answer:
          "Download means receiving something from the internet. Upload means sending something to the internet.",

        examples: [
          "I downloaded a photo.",
          "I uploaded a photo."
        ]
      }

    ]

  }

];


// =========================================================
// STATE
// =========================================================

let currentTopicId = null;


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// =========================================================
// STYLES
// =========================================================

function ensureVocabularyStyles() {

  if (
    document.getElementById(
      "zengVocabularyPageStyles"
    )
  ) {

    return;

  }


  const style =
    document.createElement("style");


  style.id =
    "zengVocabularyPageStyles";


  style.textContent = `

    .vocabulary-page {

      width:min(100%,700px);

      margin:0 auto;

    }


    .vocabulary-back-button {

      border:none;

      background:transparent;

      color:var(--primary);

      font-size:13px;

      font-weight:750;

      cursor:pointer;

      padding:6px 0;

    }


    .vocabulary-header {

      margin-top:10px;

      padding:22px;

    }


    .vocabulary-header-icon {

      font-size:38px;

      margin-bottom:8px;

    }


    .vocabulary-header-title {

      font-size:22px;

      font-weight:800;

    }


    .vocabulary-header-description {

      margin-top:7px;

      color:var(--text-secondary);

      font-size:13px;

      line-height:1.55;

    }


    .vocabulary-section-title {

      margin-top:22px;

      margin-bottom:12px;

      font-size:18px;

      font-weight:800;

    }


    .vocabulary-topic-list {

      display:flex;

      flex-direction:column;

      gap:10px;

    }


    .vocabulary-topic-card {

      width:100%;

      border:none;

      text-align:left;

      cursor:pointer;

      padding:17px;

      display:flex;

      align-items:center;

      gap:13px;

    }


    .vocabulary-topic-icon {

      width:44px;

      height:44px;

      border-radius:13px;

      background:var(--surface-soft);

      display:flex;

      align-items:center;

      justify-content:center;

      font-size:25px;

      flex-shrink:0;

    }


    .vocabulary-topic-number {

      font-size:10px;

      color:var(--text-muted);

      margin-bottom:2px;

    }


    .vocabulary-topic-title {

      font-size:15px;

      font-weight:800;

    }


    .vocabulary-topic-description {

      margin-top:4px;

      color:var(--text-secondary);

      font-size:11px;

      line-height:1.45;

    }


    .vocabulary-topic {

      width:100%;

    }


    .vocabulary-topic-title-large {

      margin-top:10px;

      font-size:23px;

      font-weight:850;

      color:var(--primary);

    }


    .vocabulary-topic-intro {

      margin-top:7px;

      color:var(--text-secondary);

      font-size:13px;

      line-height:1.55;

    }


    .vocabulary-word-card {

      margin-top:14px;

      padding:18px;

    }


    .vocabulary-word-header {

      display:flex;

      align-items:flex-start;

      justify-content:space-between;

      gap:12px;

    }


    .vocabulary-word {

      font-size:20px;

      font-weight:850;

    }


    .vocabulary-pronunciation {

      margin-top:4px;

      color:var(--text-muted);

      font-size:11px;

    }


    .vocabulary-meaning {

      margin-top:12px;

      font-size:13px;

      line-height:1.55;

    }


    .vocabulary-label {

      display:block;

      margin-top:14px;

      margin-bottom:5px;

      font-size:12px;

      font-weight:800;

    }


    .vocabulary-explanation {

      color:var(--text-secondary);

      font-size:12px;

      line-height:1.6;

    }


    .vocabulary-example {

      margin-top:8px;

      padding:11px 12px;

      border-radius:11px;

      background:var(--surface-soft);

      font-size:12px;

      line-height:1.55;

    }


    .vocabulary-usage {

      color:var(--text-secondary);

      font-size:12px;

      line-height:1.6;

    }


    .vocabulary-mistake {

      margin-top:10px;

      padding:11px 12px;

      border-left:4px solid var(--primary);

      border-radius:10px;

      background:var(--surface-soft);

      font-size:12px;

      line-height:1.55;

    }


    .vocabulary-doubts {

      margin-top:20px;

      padding:18px;

    }


    .vocabulary-doubts-title {

      font-size:17px;

      font-weight:800;

    }


    .vocabulary-doubt {

      margin-top:12px;

      padding:13px;

      border-radius:11px;

      background:var(--surface-soft);

    }


    .vocabulary-doubt-question {

      font-size:13px;

      font-weight:800;

    }


    .vocabulary-doubt-answer {

      margin-top:7px;

      color:var(--text-secondary);

      font-size:12px;

      line-height:1.6;

    }


    .vocabulary-practice {

      margin-top:18px;

      padding:18px;

    }


    .vocabulary-practice-title {

      font-size:16px;

      font-weight:800;

    }


    .vocabulary-practice-text {

      margin-top:7px;

      color:var(--text-secondary);

      font-size:12px;

      line-height:1.55;

    }


    .vocabulary-practice-word {

      margin-top:10px;

      padding:12px;

      border-radius:11px;

      background:var(--surface-soft);

      font-size:13px;

      font-weight:700;

    }


    .vocabulary-footer-note {

      margin-top:18px;

      padding:15px;

      text-align:center;

      color:var(--text-secondary);

      font-size:11px;

      line-height:1.5;

    }

  `;


  document.head.appendChild(
    style
  );

}


// =========================================================
// RENDER TOPIC LIST
// =========================================================

function renderVocabularyList(
  container
) {

  currentTopicId = null;


  container.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:20px 16px 32px;
        "
      >

        <div class="vocabulary-page">

          <button
            type="button"
            class="vocabulary-back-button"
            id="vocabularyBackButton"
          >
            ← Back to Dashboard
          </button>


          <div
            class="card vocabulary-header"
          >

            <div class="vocabulary-header-icon">
              🧠
            </div>

            <div class="vocabulary-header-title">
              Build Your Vocabulary
            </div>

            <div class="vocabulary-header-description">
              Learn useful English words through simple
              explanations, everyday examples and practical
              situations.
            </div>

          </div>


          <div class="vocabulary-section-title">
            Vocabulary Topics
          </div>


          <div class="vocabulary-topic-list">

            ${VOCABULARY_TOPICS.map(
              (topic) => `

                <button
                  type="button"
                  class="card vocabulary-topic-card"
                  data-vocabulary-topic="${escapeHTML(topic.id)}"
                >

                  <div class="vocabulary-topic-icon">
                    ${topic.icon}
                  </div>


                  <div>

                    <div class="vocabulary-topic-number">
                      Topic ${topic.number}
                    </div>

                    <div class="vocabulary-topic-title">
                      ${escapeHTML(topic.title)}
                    </div>

                    <div class="vocabulary-topic-description">
                      ${escapeHTML(topic.description)}
                    </div>

                  </div>

                </button>

              `
            ).join("")}

          </div>


          <div class="card vocabulary-footer-note">

            Learn a few words regularly and try to use them
            in your own sentences.

          </div>

        </div>

      </div>

    </div>

  `;


  document
    .getElementById(
      "vocabularyBackButton"
    )
    ?.addEventListener(
      "click",
      () => {

        window.dispatchEvent(
          new CustomEvent(
            "zeng:navigate",
            {
              detail: {
                page: "dashboard"
              }
            }
          )
        );

      }
    );


  container
    .querySelectorAll(
      "[data-vocabulary-topic]"
    )
    .forEach(
      (card) => {

        card.addEventListener(
          "click",
          () => {

            const topicId =
              card.dataset.vocabularyTopic;


            renderVocabularyTopic(
              container,
              topicId
            );

          }
        );

      }
    );

}


// =========================================================
// RENDER TOPIC
// =========================================================

function renderVocabularyTopic(
  container,
  topicId
) {

  const topic =
    VOCABULARY_TOPICS.find(
      (item) =>
        item.id === topicId
    );


  if (!topic) {

    renderVocabularyList(
      container
    );

    return;

  }


  currentTopicId =
    topicId;


  container.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:20px 16px 32px;
        "
      >

        <div class="vocabulary-page vocabulary-topic">

          <button
            type="button"
            class="vocabulary-back-button"
            id="topicBackButton"
          >
            ← All Vocabulary Topics
          </button>


          <div
            style="
              margin-top:16px;
              font-size:36px;
            "
          >
            ${topic.icon}
          </div>


          <div class="vocabulary-topic-title-large">
            Topic ${topic.number}: ${escapeHTML(topic.title)}
          </div>


          <div class="vocabulary-topic-intro">
            ${escapeHTML(topic.description)}
          </div>


          ${topic.words.map(
            (word) => `

              <div
                class="card vocabulary-word-card"
              >

                <div class="vocabulary-word-header">

                  <div>

                    <div class="vocabulary-word">
                      ${escapeHTML(word.word)}
                    </div>

                    <div class="vocabulary-pronunciation">
                      ${escapeHTML(word.pronunciation)}
                    </div>

                  </div>

                </div>


                <div class="vocabulary-meaning">

                  <strong>Meaning:</strong>
                  ${escapeHTML(word.meaning)}

                </div>


                <span class="vocabulary-label">
                  Easy Explanation
                </span>

                <div class="vocabulary-explanation">
                  ${escapeHTML(word.explanation)}
                </div>


                <span class="vocabulary-label">
                  Everyday Examples
                </span>

                ${word.examples.map(
                  (example) => `

                    <div class="vocabulary-example">
                      ${escapeHTML(example)}
                    </div>

                  `
                ).join("")}


                <span class="vocabulary-label">
                  How to Use It
                </span>

                <div class="vocabulary-usage">
                  ${escapeHTML(word.usage)}
                </div>


                <div class="vocabulary-mistake">

                  <strong>
                    Common Mistake:
                  </strong>

                  ${escapeHTML(word.commonMistake)}

                </div>

              </div>

            `
          ).join("")}


          <!-- =========================================
               COMMON DOUBTS
               ========================================= -->

          <div
            class="card vocabulary-doubts"
          >

            <div class="vocabulary-doubts-title">
              🤔 Common Doubts
            </div>


            ${topic.doubts.map(
              (doubt) => `

                <div class="vocabulary-doubt">

                  <div class="vocabulary-doubt-question">
                    ${escapeHTML(doubt.question)}
                  </div>

                  <div class="vocabulary-doubt-answer">
                    ${escapeHTML(doubt.answer)}
                  </div>


                  ${
                    doubt.examples
                    ?
                    doubt.examples.map(
                      (example) => `

                        <div class="vocabulary-example">
                          ${escapeHTML(example)}
                        </div>

                      `
                    ).join("")
                    :
                    ""
                  }

                </div>

              `
            ).join("")}

          </div>


          <!-- =========================================
               PRACTICE
               ========================================= -->

          <div
            class="card vocabulary-practice"
          >

            <div class="vocabulary-practice-title">
              ✏️ Quick Practice
            </div>


            <div class="vocabulary-practice-text">
              Choose one new word from this topic and make
              your own sentence about your daily life.
            </div>


            <div class="vocabulary-practice-word">
              Example:
              "I usually practice English in the evening."
            </div>

          </div>


          <button
            type="button"
            class="primary-button w-full"
            id="vocabularyDoneButton"
            style="
              margin-top:12px;
            "
          >
            Back to Vocabulary Topics
          </button>

        </div>

      </div>

    </div>

  `;


  document
    .getElementById(
      "topicBackButton"
    )
    ?.addEventListener(
      "click",
      () => {

        renderVocabularyList(
          container
        );

      }
    );


  document
    .getElementById(
      "vocabularyDoneButton"
    )
    ?.addEventListener(
      "click",
      () => {

        renderVocabularyList(
          container
        );

      }
    );

}


// =========================================================
// PUBLIC RENDER FUNCTION
// =========================================================

function renderVocabularyPage(
  container,
  options = {}
) {

  if (!container) {
    return;
  }


  ensureVocabularyStyles();


  renderVocabularyList(
    container
  );

}


// =========================================================
// EXPORT
// =========================================================

export {

  VOCABULARY_TOPICS,

  renderVocabularyPage

};
