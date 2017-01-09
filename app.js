'use strict';

/*
*  Сортировка пузырьком. Вызывается в {infoBlock}
*/
class BubbleSortMethod {

   constructor() {
      this.array = this.getRandomArray();
      this.arraySorted = this.array.slice().sort(function(a,b){ return b-a; });
      this.arraySortedRandom = this.array.slice().sort(function(a, b) { return Math.random() - 0.5; });

      this.getRandomArray();
      this.renderBlocks();
      this.sortBlocksRandom();
      this.animation(this.bubbleSort(this.arraySortedRandom));

   }

   /*
   *  Генерируем массив случайных чисел
   */
   getRandomArray() {
      let arr = [];
      let randomNumber, i, distinct;
      while (arr.length < 20) {
        do {
          distinct = true;
          randomNumber = Math.floor(Math.random() * 999);
          for (i = 0; i < arr.length; i++) {
            if (randomNumber == arr[i]) {
              distinct = false;
              break;
            }
          }
       } while (!distinct)
        arr.push(randomNumber);
      }
      return arr;
   }

   /*
   *  Создаем блоки, окрашенные в приятные цвета, которые генерируются через rgb
   */
   renderBlocks() {
      let red = 10;
      let green = 15;
      let blue = 55;
      let fromTop = 0;
      let array = this.arraySorted;
      $.each(array, function(i) {
         $('.wrapper').append("<div class='block block"+array[i]+"' style='background-color: rgb("+red+", "+green+", "+blue+"); top: "+fromTop+"%;'><div class='text'><span>"+array[i]+"</span></div></div>");
         red = red + 5;
         green = green + 8;
         blue = blue + 8;
         fromTop = fromTop + 5;
      });
   }

   /*
   * Перемешиваем наши блоки в соответствии с новой случайной сортировкой
   */
   sortBlocksRandom() {
      $.each(this.arraySortedRandom,  function(i, newPosition) {
         $('.block'+[newPosition]).css({ top: i*5+"%" });
      });
   }

   /*
   *  Сортируем новый массив методом пузырька. Возвращаем массив с инструкцией по сортировке
   */
   bubbleSort(args) {
      let newMassive = [];
      let n = args.length;
      for (let i = 0; i < n-1; i++) {
         for (let j = 0; j < n-1-i; j++) {
            if (args[j] > args[j+1]) {
               let first = args[j];
               args[j] = args[j+1];
               args[j+1] = first;
               newMassive.push(args[j]+'_'+args[j+1]+'_true');
            } else {
               newMassive.push(args[j]+'_'+args[j+1]+'_false');
            }
         }
      }
      return newMassive;
   }

   /*
   *  Наглядная анимация для сортировки блоков
   */
   animation(array) {
      for (let current=0; current<array.length; current++) {
         (function(i) {
            setTimeout(function() {
               if (array[i].split('_')[2] == 'true') {
                  $('.block'+array[i].split('_')[0]).addClass('compare');
                  $('.block'+array[i].split('_')[1]).addClass('compare');
                  $('.block'+array[i].split('_')[0]).animate({ top: "-=5%", }, "slow");
                  $('.block'+array[i].split('_')[1]).animate({ top: "+=5%", }, "slow");
                  setTimeout(function() {
                     $('.block'+array[i].split('_')[0]).removeClass('compare');
                     $('.block'+array[i].split('_')[1]).removeClass('compare');
                  }, 700);
               } else {
                  $('.block'+array[i].split('_')[0]).addClass('notcompare');
                  $('.block'+array[i].split('_')[1]).addClass('notcompare');
                  setTimeout(function() {
                     $('.block'+array[i].split('_')[0]).removeClass('notcompare');
                     $('.block'+array[i].split('_')[1]).removeClass('notcompare');
                  }, 700);
               }
            }, 800*i);
         })(current);
      }
   }
}

/*
*  Информационный блок, появляющийся при загрузке страницы
*/
class infoBlock {

   constructor() {
      this.infoBlock();
   }

   infoBlock() {
      $('.info').animate({ opacity: "1", }, "slow");
      $('.startButton').click(function(){
         $('.info').fadeOut();
         let testSorting = new BubbleSortMethod;
         $('.wrapper').fadeIn();
      });
   }
}

let testSorting = new infoBlock;
