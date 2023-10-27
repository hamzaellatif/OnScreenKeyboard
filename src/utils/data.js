import {initKey} from './helpers';

export const keyboardKeys = [
{
    idx: 0,
    keys: [initKey(0, "abc", "latin", "changeLayout", 1, "buttons activeLayout"),
           initKey(1, "1"),
           initKey(2, "2"),
           initKey(3, "3"),
           initKey(4, "4"),
           initKey(5, "5"),
           initKey(6, "6"),
           initKey(7, "7"),
           initKey(8, "8"),
           initKey(9, "9"),
           initKey(10, "0"),
           initKey(11, "Clear", null, "clearSentence", 2)]
},
{
    idx: 1,
    keys: [initKey(0, "", "", null, 1),
           initKey(1, "a"),
           initKey(2, "b"),
           initKey(3, "c"),
           initKey(4, "d"),
           initKey(5, "e"),
           initKey(6, "f"),
           initKey(7, "g"),
           initKey(8, "h"),
           initKey(9, "i"),
           initKey(10, "j"),
           initKey(11, "Left", null, "cursorLeft"),
           initKey(12, "Right", null, "cursorRight")]
},
{
    idx: 2,
    keys: [initKey(0, "@#!", "specialChars1", "changeLayout", 1, "buttons"),
           initKey(2, "k"),
           initKey(3, "l"),
           initKey(4, "m"),
           initKey(5, "n"),
           initKey(6, "o"),
           initKey(7, "p"),
           initKey(8, "q"),
           initKey(9, "r"),
           initKey(10, "s"),
           initKey(11, "t"),
           initKey(12, "Space", "\xa0"),
           initKey(13, "Delete", null, "eraseChar")]
},
{
    idx: 3,
    keys: [initKey(0, "ABC", "maj", "changeLayout", 1),
           initKey(2, "u"),
           initKey(3, "v"),
           initKey(4, "w"),
           initKey(5, "x"),
           initKey(6, "y"),
           initKey(7, "z"),
           initKey(8, "_"),
           initKey(9, "-"),
           initKey(10, "@"),
           initKey(11, "."),
           initKey(12, "OK", null, "confirm", 2)]
}
];