export type Question = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export const categories = [
  { id: 'science', name: 'Science', emoji: '🔬', color: 'bg-emerald-500' },
  { id: 'history', name: 'History', emoji: '🏛️', color: 'bg-amber-600' },
  { id: 'geography', name: 'Geography', emoji: '🌍', color: 'bg-blue-500' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎬', color: 'bg-purple-500' },
  { id: 'sports', name: 'Sports', emoji: '⚽', color: 'bg-orange-500' },
];

export const questions: Question[] = [
  // Science
  { id: 1, category: 'science', question: 'What is the chemical symbol for gold?', options: ['Ag', 'Au', 'Fe', 'Cu'], correctAnswer: 1 },
  { id: 2, category: 'science', question: 'What planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctAnswer: 2 },
  { id: 3, category: 'science', question: 'What is the largest organ in the human body?', options: ['Heart', 'Liver', 'Brain', 'Skin'], correctAnswer: 3 },
  { id: 4, category: 'science', question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2 },
  { id: 5, category: 'science', question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '256'], correctAnswer: 1 },
  
  // History
  { id: 6, category: 'history', question: 'In what year did World War II end?', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2 },
  { id: 7, category: 'history', question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'], correctAnswer: 2 },
  { id: 8, category: 'history', question: 'Which ancient wonder was located in Alexandria?', options: ['Colossus', 'Lighthouse', 'Hanging Gardens', 'Temple of Artemis'], correctAnswer: 1 },
  { id: 9, category: 'history', question: 'What year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2 },
  { id: 10, category: 'history', question: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'], correctAnswer: 2 },

  // Geography
  { id: 11, category: 'geography', question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2 },
  { id: 12, category: 'geography', question: 'Which is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correctAnswer: 1 },
  { id: 13, category: 'geography', question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1 },
  { id: 14, category: 'geography', question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 3 },
  { id: 15, category: 'geography', question: 'What is the highest mountain in Africa?', options: ['Mount Kenya', 'Mount Kilimanjaro', 'Mount Elgon', 'Simien Mountains'], correctAnswer: 1 },

  // Entertainment
  { id: 16, category: 'entertainment', question: 'What year was the first iPhone released?', options: ['2005', '2006', '2007', '2008'], correctAnswer: 2 },
  { id: 17, category: 'entertainment', question: 'Who directed the movie "Inception"?', options: ['Steven Spielberg', 'Christopher Nolan', 'James Cameron', 'Quentin Tarantino'], correctAnswer: 1 },
  { id: 18, category: 'entertainment', question: 'What is the highest-grossing film of all time?', options: ['Avengers: Endgame', 'Avatar', 'Titanic', 'Star Wars'], correctAnswer: 1 },
  { id: 19, category: 'entertainment', question: 'Which band performed "Bohemian Rhapsody"?', options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'], correctAnswer: 2 },
  { id: 20, category: 'entertainment', question: 'What is the name of Harry Potter\'s owl?', options: ['Errol', 'Hedwig', 'Pigwidgeon', 'Scabbers'], correctAnswer: 1 },

  // Sports
  { id: 21, category: 'sports', question: 'How many players are on a basketball team on the court?', options: ['4', '5', '6', '7'], correctAnswer: 1 },
  { id: 22, category: 'sports', question: 'Which country won the 2022 FIFA World Cup?', options: ['France', 'Brazil', 'Argentina', 'Germany'], correctAnswer: 2 },
  { id: 23, category: 'sports', question: 'In tennis, what is a score of zero called?', options: ['Nil', 'Zero', 'Love', 'Nothing'], correctAnswer: 2 },
  { id: 24, category: 'sports', question: 'How many rings are on the Olympic flag?', options: ['4', '5', '6', '7'], correctAnswer: 1 },
  { id: 25, category: 'sports', question: 'Which sport uses a shuttlecock?', options: ['Tennis', 'Badminton', 'Squash', 'Table Tennis'], correctAnswer: 1 },
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
