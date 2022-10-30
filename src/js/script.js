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
    document.querySelector(select.templatesOf.booksTemplate).innerHTML
  ),
};

const bookContainer = document.querySelector(select.containerOf.booksList);

function RenderBooks(){
  for(let book of dataSource.books){
    const generateHTML = templates.bookTemplate({
      id: book.id,
      name: book.name,
      price: book.price,
      rating: book.rating,
      image: book.image,
      details: book.details,
    });

    const createDom = utils.createDOMFromHTML(generateHTML);
    bookContainer.appendChild(createDom);
  }
}
RenderBooks();