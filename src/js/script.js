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
    document.querySelector(select.templatesOf.booksTemplate).innerHTML
  ),
};

const bookContainer = document.querySelector(select.containerOf.booksList);
let favoriteBooks = [];


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
function initActions(){

  //   const allImages = document.querySelectorAll(select.containerOf.image);

  bookContainer.addEventListener('dblclick', function(event){
    event.preventDefault();
    const image = event.target.offsetParent;
    const imageId = image.getAttribute('data-id');
    console.log(imageId, 'id');
    //   if(image.classList.contains('favorite')){
    //     image.classList.remove('favorite');
    //     favoriteBooks.splice(imageId);}else{
    //     image.classList.add('favorite');
    //     favoriteBooks.push(imageId);
    //     console.log(favoriteBooks);
    //   }
    if(!image.classList.contains('favorite')){
      image.classList.add('favorite');
      favoriteBooks.push(imageId);
    }else{
      image.classList.remove('favorite');
      let imageIndex = favoriteBooks.indexOf(imageId);
      favoriteBooks.splice(imageIndex, 1);
      console.log(imageIndex, 'index');
    }
    console.log(favoriteBooks);
  });
}



initActions();




