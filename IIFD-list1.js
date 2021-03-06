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
                                "1a1", "1a2", "1a3", "1a4", "1a5", "1a6", "1a7",
                                "1b1", "1b2", "1b3", "1b4", "1b5", "1b6", "1b7",
                                "1c1", "1c2", "1c3", "1c4", "1c5", "1c6", "1c7",
                                "1d1", "1d2", "1d3", "1d4", "1d5", "1d6", "1d7",
                                "1e1", "1e2", "1e3", "1e4", "1e5", "1e6", "1e7",
                                "1f1", "1f2", "1f3", "1f4", "1f5", "1f6", "1f7",
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

      //list1 - premises canonical order / every or three / trial order A / image order A
          //trials: 1 block:  1001, 1117, 1142, 1023, 1069, 1140, 1035,
          //        2 block:  1031, 1085, 1124, 1011, 1132, 1101, 1047,
          //        3 block:  1134, 1109, 1057, 1128, 1075, 1037, 1089,
          //        4 block:  1137, 1115, 1041, 1129, 1053, 1099, 1013,
          //        5 block:  1107, 1067, 1125, 1063, 1143, 1025, 1095,
          //        6 block:  1051, 1007, 1121, 1077, 1017, 1083, 1135

      ["1a1",   //1001-canonical-disj-Afirst-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["1a2",   //1117-onlyP1-disj-Afirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["1a3",   //1142-onlyP2-noP1-na-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["1a4",   //1023-canonical-disj-Afirst-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["1a5",   //1069-canonical-disj-Afirst-someA-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["1a6",   //1140-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["1a7",   //1035-canonical-disj-Afirst-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["1b1",   //1031-canonical-disj-Afirst-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["1b2",   //1085-onlyP1-disj-Afirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["1b3",   //1124-onlyP2-noP1-na-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["1b4",   //1011-canonical-disj-Afirst-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["1b5",   //1132-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["1b6",   //1101-onlyP1-disj-Afirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["1b7",   //1047-canonical-disj-Afirst-someA-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["1c1",   //1134-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["1c2",   //1109-onlyP1-disj-Afirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["1c3",   //1057-canonical-disj-Afirst-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["1c4",   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], // 3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["1c5",   //1075-canonical-disj-Afirst-someA-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["1c6",   //1037-canonical-disj-Afirst-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["1c7",   //1089-onlyP1-disj-Afirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["1d1",   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["1d2",   //1115-onlyP1-disj-Afirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["1d3",   //1041-canonical-disj-Afirst-someA-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["1d4",   //1129-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["1d5",   //1053-canonical-disj-Afirst-someA-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["1d6",   //1099-onlyP1-disj-Afirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["1d7",   //1013-canonical-disj-Afirst-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["1e1",   //1107-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["1e2",   //1067-canonical-disj-Afirst-someA-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["1e3",   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["1e4",   //1063-canonical-disj-Afirst-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["1e5",   //1143-onlyP2-noP1-na-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["1e6",   //1025-canonical-disj-Afirst-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["1e7",   //1095-onlyP1-disj-Afirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["1f1",   //1051-canonical-disj-Afirst-someA-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s
      ["1f2",   //1007-canonical-disj-Afirst-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["1f3",   //1121-onlyP2-noP1-na-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["1f4",   //1077-canonical-disj-Afirst-someA-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["1f5",   //1017-canonical-disj-Afirst-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["1f6",   //1083-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["1f7",   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s

];
