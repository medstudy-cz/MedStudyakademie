import { groq } from 'next-sanity'

// Get all active quizzes
export const quizzesQuery = groq`
  *[_type == "quiz" && isActive == true] | order(_createdAt desc) {
    _id,
    slug,
    title,
    description,
    metaData,
    isActive
  }
`

// Get single quiz by slug with all questions
export const quizBySlugQuery = groq`
  *[_type == "quiz" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    description,
    startScreen,
    isActive,
    aiPrompts,
    emailSettings,
    metaData,
    analytics,
    questions[]->{
      _id,
      title,
      description,
      type,
      answers,
      required,
      order
    }
  }
`

// Get quiz with questions ordered
export const quizWithOrderedQuestionsQuery = groq`
  *[_type == "quiz" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    description,
    startScreen,
    isActive,
    aiPrompts,
    emailSettings,
    metaData,
    analytics,
    "questions": {
      "student_grade_11": {
        "en": questions.student_grade_11.en[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        },
        "ru": questions.student_grade_11.ru[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        },
        "ua": questions.student_grade_11.ua[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        }
      },
      "student_bachelor": {
        "en": questions.student_bachelor.en[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        },
        "ru": questions.student_bachelor.ru[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        },
        "ua": questions.student_bachelor.ua[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        }
      },
      "parent": {
        "en": questions.parent.en[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        },
        "ru": questions.parent.ru[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        },
        "ua": questions.parent.ua[]-> {
          _id,
          title,
          language,
          description,
          type,
          answers,
          required
        }
      }
    }
  }
`

// Get single question by ID
export const questionByIdQuery = groq`
  *[_type == "question" && _id == $id][0] {
    _id,
    title,
    description,
    type,
    answers,
    required,
    order
  }
`
