// 'preload' should be the first item in the shuffle sequence so that images are preloaded
// before any other items are displayed.

var shuffleSequence = seq(
                            "preload",
                            "taskdescrip",
                            "famknown",
                            "singleprem",
                             randomize("prac_single"),
                            "doubleprem",
                            randomize("prac_double"),
                            "start",
                                "4f7", "4f6", "4f5", "4f4", "4f3", "4f2", "4f1",
                                "4e7", "4e6", "4e5", "4e4", "4e3", "4e2", "4e1",
                                "4d7", "4d6", "4d5", "4d4", "4d3", "4d2", "4d1",
                                "4c7", "4c6", "4c5", "4c4", "4c3", "4c2", "4c1",
                                "4b7", "4b6", "4b5", "4b4", "4b3", "4b2", "4b1",
                                "4a7", "4a6", "4a5", "4a4", "4a3", "4a2", "4a1",
                            );

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },
    "NextMessage", {hideProgressBar: true,
    },
    "PracticeMessage", {hideProgressBar: true,
    },
    "StartMessage", {hideProgressBar: true,
    },
    "PictureAccept", {
      hideProgressBar: true,
      randomOrder: false
    },
    "Question", {
        hideProgressBar: true,
        hasCorrect: false,
        randomOrder: false
    },
    "FlashSentence", {
        hideProgressBar: true,
        timeout: 5000
    },
    "MyDashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "DashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "Message", {
        hideProgressBar: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

// ========== START OF CODE TO COPY INTO YOUR DATA FILE ==========
var IMAGES_TO_PRELOAD = [

    "https://imgur.com/CKEa3Zr.png", // 8-4c0s -   every-circle,                 conj & known conditions
    "https://imgur.com/EhOp8QM.png", // 8-0c3s -   three-square,                 conj & known conditions
    "https://imgur.com/d9htci3.png", // 8-4c3s -   every-circle / three-square,  conj condition

    "https://imgur.com/eQh40x2.png", // 8-2c3s -   every-circle,                 known & unknown conditions
    "https://imgur.com/zIUwK4N.png", // 8-4c2s -   three-square,                 known & unknown conditions

    "https://imgur.com/VAObTsD.png", // 8-0c4s -   every-square,                 conj & known conditions
    "https://imgur.com/mnzhSDj.png", // 8-3c0s -   three-circle,                 conj & known conditions
    "https://imgur.com/mKarxSv.png", // 8-3c4s -   every-square / three-circle,  conj condition

    "https://imgur.com/KduS46H.png", // 8-3c2s -   every-square,                 known & unknown conditions
    "https://imgur.com/M6bF0FW.png", // 8-2c4s -   three-circle,                 known & unknown conditions

    "https://imgur.com/szZ1mVE.png", // 8-1c2s-control
    "https://imgur.com/wkDVZgd.png", // 8-1c3s-control
    "https://imgur.com/zXTKjiQ.png", // 8-2c2s-control
    "https://imgur.com/yv9ULuj.png", // 8-4c4s-control


];

define_ibex_controller({
    name: "Preloader",
    jqueryWidget: {
        _init: function () {
            this.element.append("Loading images...");

            this.preloadedImages = [ ];
            var numToPreload = IMAGES_TO_PRELOAD.length;
            for (var i = 0; i < IMAGES_TO_PRELOAD.length; ++i) {
                var img = new Image();
                img.src = IMAGES_TO_PRELOAD[i];
                var self = this;
                img.onload = function () {
                    --numToPreload;
                    if (numToPreload == 0) {
                        self.options._finishedCallback([ ]);
                    }
                }
                this.preloadedImages.push(img);
            }
        }
    },
    properties: {
        countsForProgressBar: false
    }
});
// ========= END OF CODE TO COPY INTO YOUR DATA FILE ==========

var items = [

    // Define the 'preload' item.
    ["preload", "Preloader", { }],

    ["sep", "Separator", { }],

    ["setcounter", "__SetCounter__", { }],

    ["taskdescrip","NextMessage", {html: {include: 'iifd_task.html'}}],

    ["famknown","NextMessage", {html: {include: 'iifd_known_sample.html'}}],

    ["singleprem","PracticeMessage", {html: {include: 'iifd_introduce_single.html'}}],

    ["doubleprem","PracticeMessage", {html: {include: 'iifd_introduce_double.html'}}],

    ["start","StartMessage", {html: {include: 'iifd_start.html'}}],

    ["prac_single", //every shape: choice between 4c4s (correct, left) and 2c2s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/wkDVZgd.png"], //4c4s - true
                                        ["K","https://imgur.com/zXTKjiQ.png"]]}],//2c2s - false
    ["prac_single", //three squares: choice between 1c3s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s - true
    ["prac_double", //one or four circles, every shape: choice between 4c4s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_one_circles_four_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/wkDVZgd.png"]]}], //4c4s - true
    ["prac_double", //two or three squares, two circles : choice between 2c2s (correct, left) and 1c3s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_two_squares_three_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_two_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zXTKjiQ.png"], //2c2s - true
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s- false

      // condition names: #-premiseorder-P1-disjunctorder-P2-Ashape-imageset-Afallaciousimageside

      //list2 - premises canonical order / three or every / trial order A / image order B
          //trials: 1 block:  1136, 1082, 1020, 1080, 1122, 1006, 1050,

          //        2 block: 1094, 1028, 1144,  1062, 1126, 1066, 1106,

          //        3 block:  1016,1098,  1056, 1130,1044, 1114, 1138,

          //        4 block:  1092,1040, 1074, 1127, 1060, 1112, 1133,

          //        5 block:  1046,1104, 1131, 1010,  1123, 1088,1030,

          //        6 block:  1034,1139, 1072, 1022, 1141, 1120, 1004,


      ["4a1",   //1004-canonical-disj-Bfirst-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["4a2",   //1120-onlyP1-disj-Bfirst-noP2-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["4a3",   //1141-onlyP2-noP1-na-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["4a4",   //1022-canonical-disj-Bfirst-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["4a5",   //1072-canonical-disj-Bfirst-someA-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["4a6",   //1139-onlyP2-noP1-na-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["4a7",   //1034-canonical-disj-Bfirst-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["4b1",   //1030-canonical-disj-Bfirst-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["4b2",   //1088-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["4b3",   //1123-onlyP2-noP1-na-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["4b4",   //1010-canonical-disj-Bfirst-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["4b5",   //1131-onlyP2-noP1-na-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["4b6",   //1104-onlyP1-disj-Bfirst-noP2-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["4b7",   //1046-canonical-disj-Bfirst-someA-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["4c1",   //1133-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["4c2",   //1112-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["4c3",   //1060-canonical-disj-Bfirst-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["4c4",   //1127-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["4c5",   //1074-canonical-disj-Bfirst-someA-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["4c6",   //1040-canonical-disj-Bfirst-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["4c7",   //1092-onlyP1-disj-Bfirst-noP2-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["4d1",   //1138-onlyP2-noP1-na-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["4d2",   //1114-onlyP1-disj-Bfirst-noP2-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["4d3",   //1044-canonical-disj-Bfirst-someA-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["4d4",   //1130-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["4d5",   //1056-canonical-disj-Bfirst-someA-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["4d6",   //1098-onlyP1-disj-Bfirst-noP2-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["4d7",   //1016-canonical-disj-Bfirst-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["4e1",   //1106-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["4e2",   //1066-canonical-disj-Bfirst-someA-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["4e3",   //1126-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["4e4",   //1062-canonical-disj-Bfirst-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["4e5",   //1144-onlyP2-noP1-na-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["4e6",   //1028-canonical-disj-Bfirst-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["4e7",   //1094-onlyP1-disj-Bfirst-noP2-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["4f1",   //1050-canonical-disj-Bfirst-someA-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["4f2",   //1006-canonical-disj-Bfirst-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["4f3",   //1122-onlyP2-noP1-na-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["4f4",   //1080-canonical-disj-Bfirst-someA-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["4f5",    //1020-canonical-disj-Bfirst-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["4f6",   //1082-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["4f7",   //1136-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s

];
