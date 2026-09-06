export interface Question {
  cau: number;
  doan: 'A' | 'B' | 'C' | 'D' | null;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
}

export const PASSAGES: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: `GREEN SUNDAY - VOLUNTEER CLEAN-UP
Nguyen Trai Secondary School invites all students to (13) _______ in our Green Sunday programme.
Time: 7:00 a.m., Sunday, 12th October
Place: Nguyen Hue Park, next to the school gate
Students should wear comfortable shoes and (14) _______ their own gloves.
Groups of ten will collect rubbish and (15) _______ young trees along the walking path.
Certificates will be given to all volunteers (16) _______ the end of the programme.`,

  B: `Online learning has become popular among Vietnamese students in recent years. With a computer and an Internet (19) _______, learners can join a class without leaving home. This saves them a lot of time and money, (20) _______ they do not have to travel to school every day. Many students also say that they feel (21) _______ relaxed when they study in their own room.

However, online learning is not perfect. Some students find it hard to (22) _______ attention during a long lesson on the screen. Others miss the chance to work (23) _______ their classmates face to face. Therefore, most teachers believe that online lessons should be used (24) _______ traditional ones, not to replace them completely.`,

  C: `Every month, on the fourteenth day of the lunar calendar, the old town of Hoi An turns off its electric lights. For one evening, the yellow walls, the wooden shops and the narrow streets are lit only by silk lanterns. This special night is called the Hoi An Lantern Festival, and it has been held since 1998.

Making a lantern is not easy. First, a craftsman cuts bamboo into thin sticks and bends them into a round or star shape. Then he covers the frame with colourful silk. A good lantern maker can finish only a few lanterns a day, because every stick must be tied by hand. Some families in Hoi An have been doing this job for three generations.

On festival nights, local people put small paper boats with candles on the Thu Bon River. Visitors often buy one and make a wish before setting it free on the water. Traditional games, folk songs and bai choi singing are performed near the Japanese Covered Bridge until late in the evening.

The festival has brought a lot of visitors to the town, and many young people who once left for big cities have come back to open small shops. However, the local government also has to remind tourists to keep the river clean, because thousands of paper boats can become rubbish if nobody collects them.`,

  D: `Last week our school held a Book Day in the main hall. (37) _______ Each class brought about fifty old books and put them on a long table near the door. (38) _______ Students could exchange a book they had already read for a new one. (39) _______ At the end of the day, the books that were left were sent to a primary school in a mountainous province. (40) _______`
};

export const QUESTIONS: Question[] = [
  {"cau":1,"doan":null,"hoi":"Choose the word whose underlined part (in capital letters) is pronounced differently from the others.","A":"schOOl","B":"fOOd","C":"mOOn","D":"bOOk","dapAn":"D"},
  {"cau":2,"doan":null,"hoi":"Choose the word whose underlined part (in capital letters) is pronounced differently from the others.","A":"helpED","B":"wantED","C":"lookED","D":"stoppED","dapAn":"B"},
  {"cau":3,"doan":null,"hoi":"Choose the word whose stress pattern is different from the others.","A":"begin","B":"enjoy","C":"travel","D":"relax","dapAn":"C"},
  {"cau":4,"doan":null,"hoi":"Choose the word whose stress pattern is different from the others.","A":"beautiful","B":"important","C":"difficult","D":"interesting","dapAn":"B"},
  {"cau":5,"doan":null,"hoi":"If I _______ more free time, I would join the school's volunteer club.","A":"have","B":"will have","C":"would have","D":"had","dapAn":"D"},
  {"cau":6,"doan":null,"hoi":"Lan _______ in Ho Chi Minh City since she was five years old.","A":"lives","B":"lived","C":"has lived","D":"is living","dapAn":"C"},
  {"cau":7,"doan":null,"hoi":"The Ao Dai _______ by many Vietnamese women on special occasions.","A":"wears","B":"is wearing","C":"has worn","D":"is worn","dapAn":"D"},
  {"cau":8,"doan":null,"hoi":"The man _______ helped us find the way to Hoi An Ancient Town was very friendly.","A":"which","B":"whom","C":"who","D":"whose","dapAn":"C"},
  {"cau":9,"doan":null,"hoi":"My brother enjoys _______ photos of old streets in the early morning.","A":"to take","B":"take","C":"taken","D":"taking","dapAn":"D"},
  {"cau":10,"doan":null,"hoi":"Thanks to social networks, students can easily keep _______ touch with their old friends.","A":"in","B":"on","C":"at","D":"for","dapAn":"A"},
  {"cau":11,"doan":null,"hoi":"Plastic bags are one of the main causes of environmental _______.","A":"pollute","B":"polluted","C":"pollution","D":"pollutant","dapAn":"C"},
  {"cau":12,"doan":null,"hoi":"Mai: \"Congratulations on your excellent result!\"  -  Nam: \"_______\"","A":"Thank you. That's very kind of you.","B":"Yes, of course.","C":"Never mind.","D":"I'm afraid not.","dapAn":"A"},
  {"cau":13,"doan":"A","hoi":"Choose the best option for blank (13).","A":"attend","B":"take part","C":"arrive","D":"belong","dapAn":"B"},
  {"cau":14,"doan":"A","hoi":"Choose the best option for blank (14).","A":"bring","B":"borrow","C":"lend","D":"take away","dapAn":"A"},
  {"cau":15,"doan":"A","hoi":"Choose the best option for blank (15).","A":"grow up","B":"plant","C":"build","D":"put","dapAn":"B"},
  {"cau":16,"doan":"A","hoi":"Choose the best option for blank (16).","A":"in","B":"on","C":"at","D":"from","dapAn":"C"},
  {"cau":17,"doan":null,"hoi":"Arrange the following sentences to make a logical paragraph.\na. Last summer, my class visited a small village in the Mekong Delta.\nb. There, we learnt how local people make sweets from coconuts.\nc. We stayed there for three days and helped the farmers pick fruit.","A":"a - b - c","B":"c - a - b","C":"b - a - c","D":"a - c - b","dapAn":"D"},
  {"cau":18,"doan":null,"hoi":"Choose the best sentence to end the paragraph below.\nLast summer, my class visited a small village in the Mekong Delta. We stayed there for three days and helped the farmers pick fruit. There, we learnt how local people make sweets from coconuts. _______","A":"That trip taught us a lot about country life and we still talk about it today.","B":"Coconuts are grown in many countries around the world.","C":"My class has never travelled anywhere together.","D":"The village is about two hundred kilometres from my school.","dapAn":"A"},
  {"cau":19,"doan":"B","hoi":"Choose the best option for blank (19).","A":"connect","B":"connected","C":"connecting","D":"connection","dapAn":"D"},
  {"cau":20,"doan":"B","hoi":"Choose the best option for blank (20).","A":"but","B":"so","C":"although","D":"because","dapAn":"D"},
  {"cau":21,"doan":"B","hoi":"Choose the best option for blank (21).","A":"more","B":"much","C":"most","D":"many","dapAn":"A"},
  {"cau":22,"doan":"B","hoi":"Choose the best option for blank (22).","A":"pay","B":"take","C":"make","D":"give","dapAn":"A"},
  {"cau":23,"doan":"B","hoi":"Choose the best option for blank (23).","A":"about","B":"for","C":"with","D":"to","dapAn":"C"},
  {"cau":24,"doan":"B","hoi":"Choose the best option for blank (24).","A":"instead of","B":"together with","C":"because of","D":"thanks to","dapAn":"B"},
  {"cau":25,"doan":null,"hoi":"Choose the sentence that is closest in meaning to the sentence below.\nMy mother said to me, \"Don't stay up too late.\"","A":"My mother told me not to stay up too late.","B":"My mother told me don't stay up too late.","C":"My mother said me not to stay up too late.","D":"My mother asked me if I stayed up too late.","dapAn":"A"},
  {"cau":26,"doan":null,"hoi":"Choose the sentence that is closest in meaning to the sentence below.\nWhy don't we go to the library this afternoon?","A":"We should have gone to the library this afternoon.","B":"Do you go to the library this afternoon?","C":"We used to go to the library this afternoon.","D":"Let's go to the library this afternoon.","dapAn":"D"},
  {"cau":27,"doan":null,"hoi":"Choose the correct sentence made from the cues below.\nIt / rain / heavily / so / we / cancel / the picnic.","A":"It rained heavily, so we cancelled the picnic.","B":"It was rained heavily, so we cancelled the picnic.","C":"It rains heavily, so we cancel the picnic yesterday.","D":"It rained heavily, so we were cancelled the picnic.","dapAn":"A"},
  {"cau":28,"doan":null,"hoi":"Choose the correct sentence made from the cues below.\nShe / be interested in / learn / Japanese / since last year.","A":"She is interested in learn Japanese since last year.","B":"She has been interested in learning Japanese since last year.","C":"She was interested in learning Japanese since last year.","D":"She is being interested to learn Japanese since last year.","dapAn":"B"},
  {"cau":29,"doan":null,"hoi":"What does the sign below mean?\nNO SWIMMING WHEN THE RED FLAG IS UP","A":"You may swim only when you see a red flag.","B":"You must not swim while the red flag is flying.","C":"Red flags are put up after all swimmers leave.","D":"Swimming is not allowed at this beach at any time.","dapAn":"B"},
  {"cau":30,"doan":null,"hoi":"What does the notice below mean?\nLIBRARY CARDS MUST BE SHOWN AT THE DESK BEFORE YOU BORROW ANY BOOK.","A":"Readers can borrow books without a card.","B":"Books at the desk are not for borrowing.","C":"You have to show your card before borrowing a book.","D":"The desk is closed for readers today.","dapAn":"C"},
  {"cau":31,"doan":"C","hoi":"What is the passage mainly about?","A":"How silk is produced in Hoi An.","B":"The lantern festival in Hoi An and its effects.","C":"The history of the Japanese Covered Bridge.","D":"Games that Vietnamese children play at night.","dapAn":"B"},
  {"cau":32,"doan":"C","hoi":"According to the passage, the Lantern Festival takes place _______.","A":"every evening in Hoi An","B":"once a month","C":"only in summer","D":"twice a month","dapAn":"B"},
  {"cau":33,"doan":"C","hoi":"According to the passage, a lantern maker _______.","A":"uses machines to tie the bamboo sticks","B":"can make hundreds of lanterns a day","C":"ties every bamboo stick by hand","D":"buys ready-made bamboo frames","dapAn":"C"},
  {"cau":34,"doan":"C","hoi":"The word \"performed\" in paragraph 3 is closest in meaning to _______.","A":"presented","B":"repaired","C":"recorded","D":"invented","dapAn":"A"},
  {"cau":35,"doan":"C","hoi":"Which of the following is NOT mentioned as happening on festival nights?","A":"Folk songs are sung.","B":"People float paper boats on the river.","C":"Electric lights are turned off.","D":"Fireworks are set off over the river.","dapAn":"D"},
  {"cau":36,"doan":"C","hoi":"What problem does the passage mention?","A":"Too few tourists come to the town.","B":"Young people refuse to return to Hoi An.","C":"Paper boats can pollute the river.","D":"Silk lanterns are becoming too expensive.","dapAn":"C"},
  {"cau":37,"doan":"D","hoi":"Choose the best sentence for blank (37).","A":"The idea was to give old books a second life instead of leaving them on the shelf.","B":"Some of them were story books, and others were dictionaries and comics.","C":"Nobody had to pay any money; they only had to bring a book of their own.","D":"Everyone agreed that we should hold this activity again next year.","dapAn":"A"},
  {"cau":38,"doan":"D","hoi":"Choose the best sentence for blank (38).","A":"The idea was to give old books a second life instead of leaving them on the shelf.","B":"Some of them were story books, and others were dictionaries and comics.","C":"Nobody had to pay any money; they only had to bring a book of their own.","D":"Everyone agreed that we should hold this activity again next year.","dapAn":"B"},
  {"cau":39,"doan":"D","hoi":"Choose the best sentence for blank (39).","A":"The idea was to give old books a second life instead of leaving them on the shelf.","B":"Some of them were story books, and others were dictionaries and comics.","C":"Nobody had to pay any money; they only had to bring a book of their own.","D":"Everyone agreed that we should hold this activity again next year.","dapAn":"C"},
  {"cau":40,"doan":"D","hoi":"Choose the best sentence for blank (40).","A":"The idea was to give old books a second life instead of leaving them on the shelf.","B":"Some of them were story books, and others were dictionaries and comics.","C":"Nobody had to pay any money; they only had to bring a book of their own.","D":"Everyone agreed that we should hold this activity again next year.","dapAn":"D"}
];
