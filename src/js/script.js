{
  'use strict';

  const select = {
    containerOf: {
      booksList: '.books-list',
      image: '.book__image',
      filters: '.filters',
    },
    templatesOf: {
      booksTemplate: '#template-book',
    },
  };
  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templatesOf.booksTemplate).innerHTML),
  };

  class BooksList {
    constructor() {
      this.initData();
      this.getElements();
      this.render();
      this.initActions();
    }

    initData() {
      this.data = dataSource.books;
      this.favoriteBooks = [];
      this.filters = [];
    }

    getElements() {
      this.bookContainer = document.querySelector(select.containerOf.booksList);
      this.booksFilter = document.querySelector(select.containerOf.filters);
    }
    render() {

      for (let book of this.data) {
        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        /* generate HTML based on template */
        const generatedHTML = templates.bookTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });

        /* create element using utils.createElementFromHTML */
        const elem = utils.createDOMFromHTML(generatedHTML);

        /* find book container */
        const bookContainer = document.querySelector(
          select.containerOf.booksList
        );

        /* add book to menu[?] */
        bookContainer.appendChild(elem);
      }
    }

    initActions() {

      const thisBooksList = this;


      thisBooksList.bookContainer.addEventListener(
        'dblclick',
        function (event) {
          event.preventDefault();

          const image = event.target.offsetParent;
          const imageId = image.getAttribute('data-id');


          if (!thisBooksList.favoriteBooks.includes(imageId)) {
            image.classList.add('favorite');
            thisBooksList.favoriteBooks.push(imageId);
          } else {
            const indexOfBook = thisBooksList.favoriteBooks.indexOf(imageId);
            thisBooksList.favoriteBooks.splice(indexOfBook, 1);
            image.classList.remove('favorite');
          }

          console.log('favoriteBooks', thisBooksList.favoriteBooks);
        }
      );

      const booksFilter = document.querySelector(select.containerOf.filters);
      console.log('booksFilter', booksFilter);

      booksFilter.addEventListener('click', function (callback) {
        const clickedElement = callback.target;

        if (
          clickedElement.tagName == 'INPUT' &&
          clickedElement.type == 'checkbox' &&
          clickedElement.name == 'filter'
        ) {
          console.log('clickedElement', clickedElement);

          if (clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
          } else {
            const indexOfValue = thisBooksList.filters.indexOf(
              clickedElement.value
            );
            thisBooksList.filters.splice(indexOfValue, 1);
          }
        }

        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        const filterOfHiddenBooks = document.querySelector(
          select.containerOf.image + '[data-id = "' + book.id + '"]'
        );

        for (const filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden) {
          filterOfHiddenBooks.classList.add('hidden');
        } else {
          filterOfHiddenBooks.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';

      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }

      return background;
    }
  }

  new BooksList();
}
