// Initialization of required variables and objects.
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
let collection = [];
let categorySelector = document.getElementById('selectCategory');
let brandSelector = document.getElementById('selectBrand');
let yearSelector = document.getElementById('selectYear');
let collectionSelector = document.getElementById('selectCollection');

let brandArray = [
    {optionValue:'null', optionText:'----'},
    {optionValue:'Pokemon', optionText:'Pokemon'},
    {optionValue:'MTG', optionText:'MTG'},
    {optionValue:'MLB', optionText:'MLB'},
    {optionValue:'Nike', optionText:'Nike'}
            ];
let categoryArray = [
    {optionValue:'null', optionText:'----'},
    {optionValue:'TCG', optionText:'TCG'},
    {optionValue:'Comic Books', optionText:'Comic Books'},
    {optionValue:'Shoes', optionText:'Shoes'},
    {optionValue:'Stamps', optionText:'Stamps'},
    {optionValue:'Coins', optionText:'Coins'},
    {optionValue:'Books', optionText:'Books'},
    {optionValue:'Sports Cards', optionText:'Sports Cards'},
];

let yearArray = [
    {optionValue:'null', optionText:'----'},];

document.getElementById('options').style.display = 'none'
document.getElementById('add').addEventListener('click', () => showAndHide('options'));
document.getElementById('addNewItem').addEventListener('click', () => showAndHide('options'));
document.getElementById('addCategory').addEventListener('click', () => showAndHide('options'));
document.getElementById('addBrand').addEventListener('click', () => showAndHide('options'));
document.getElementById('filterImgG').addEventListener('click', () => filterMenu('enable'));
document.getElementById('filterImgB').addEventListener('click', () => filterMenu('disable'));

document.getElementById('addNewItem').addEventListener('click', () => {
    let itemForm = new Form('itemPopUp', document.createElement('div'), {}, 'itemPopUp', false);
    itemForm.init();
})

document.getElementById('addCategory').addEventListener('click', () => {
    let categoryPopUp = new Form('categoryPopUp', document.createElement('div'), {}, 'categoryPopUp', false);
    categoryPopUp.init()
})

document.getElementById('addBrand').addEventListener('click', () => {
    let brandPopUp = new Form('brandPopUp', document.createElement('div'), {}, 'brandPopUp', false);
    brandPopUp.init()
})

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Required object constructors:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
function Item (name, category, brand, year, owned, cardImage, inContainer, id=createId()) {
    this.name = name;
    this.css = document.createElement('div');
    this.category = category;
    this.brand = brand;
    this.year = year;
    this.owned = owned;
    this.cardImage = cardImage;
    this.inContainer = inContainer;
    this.id = id;
    this.display = false;
};

function Button (name, css, fontColor, color, filterType, className, idName, initStatus, state) {
    this.name = name;
    this.css = css;
    this.fontColor = fontColor;
    this.color = color;
    this.filterType = filterType;
    this.className = className;
    this.idName = idName;
    this.initStatus = initStatus;
    this.state = state;
    this.originalState = [name, css, fontColor, color, filterType, className, idName, state];
};

function CollectionButton (cardInstance) {
    Button.apply(this, arguments)
    this.cardInstance = cardInstance;
}

CollectionButton.prototype = Object.create(Button.prototype);

// Form constructor that inistantiates different types of forms.
function Form (name, css, input, type, initValue) {
    this.name = name;
    this.css = css;
    this.input = input;
    this.type = type;
    this.initValue = initValue;
}

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Prototype Methods for Items:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/

Item.prototype.createCard = function () {
    let middleContainer = document.getElementById('middleContainer')
    this.css.setAttribute('class', 'card')
    middleContainer.appendChild(this.css);
    let modifyContainer = document.createElement('div');
    modifyContainer.setAttribute('id', 'modifyContainer');
    this.css.appendChild(modifyContainer);
    let cardName = document.createElement('div');
    cardName.setAttribute('id', 'cardName');
    cardName.innerHTML = this.name;
    modifyContainer.appendChild(cardName);
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'deleteButton');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', () => {
        document.getElementById('middleContainer').removeChild(this.css);
        //code to be added.
    });
    modifyContainer.appendChild(deleteButton);
    let cardImageContainer = document.createElement('div');
    cardImageContainer.setAttribute('id', 'cardImage');
    this.css.appendChild(cardImageContainer);
    if (this.cardImage === false) {
        this.cardImage = 'Pictures/upload.png';
    }
    let image = document.createElement('img');
    image.src= this.cardImage;
    cardImageContainer.appendChild(image);
    let ownershipTag = document.createElement('div');
    ownershipTag.setAttribute('id', `ownershipTagFor${this.name}`);
    this.css.appendChild(ownershipTag);
    if (this.owned === 'true') {
        let collectionButton = new CollectionButton('Collected', document.createElement("button"), 'white', '#67cf67', 'collection', 'collectionButton', 'collectionButton', 'true', true)
        collectionButton.init(this.id);
        document.getElementById(`ownershipTagFor${this.name}`).appendChild(collectionButton.css);
    } else if (this.owned === 'false') {
        let collectionButton = new CollectionButton('Not Collected', document.createElement("button"), 'black', '#fafafa', 'collection', 'collectionButton', 'collectionButton', 'false', false);
        collectionButton.init(this.id);
        document.getElementById(`ownershipTagFor${this.name}`).appendChild(collectionButton.css);
    }
    let cardContent = document.createElement('div');
    cardContent.setAttribute('id', 'cardContent');
    this.css.appendChild(cardContent);
    let categoryCardText = document.createElement('div');
    categoryCardText.setAttribute('class', 'cardText');
    categoryCardText.setAttribute('id', 'categoryCardText');
    categoryCardText.innerHTML = this.category;
    cardContent.appendChild(categoryCardText);
    let brandCardText = document.createElement('div');
    brandCardText.setAttribute('class', 'cardText');
    brandCardText.setAttribute('id', 'brandCardText');
    brandCardText.innerHTML = this.brand;
    cardContent.appendChild(brandCardText);
}


Item.prototype.init = function () {
    collection.push(this);
    this.createCard();
}

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Prototype Methods for Buttons:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
Button.prototype.changeState = function() {
    if (this.state === false) {
        this.css.style.backgroundColor = this.fontColor;
        this.css.style.color = this.color;
        document.getElementById('filter').style.display = 'flex';
        this.state = true;
    } else if(this.state = true) {
        this.stateReset();

    }
};


Button.prototype.init = function() {
    this.css.style.backgroundColor = this.color;
    this.css.style.color = this.fontColor;
    this.css.innerHTML = this.name;
    this.css.className = this.className;
    if (this.initStatus === false) {
        this.css.addEventListener('mouseleave', () => {
            if (this.state === false) {
                this.css.style.backgroundColor = this.color;
                this.css.style.color = this.fontColor;
            }
        });
        this.css.addEventListener('mouseenter', () => {
            if (this.state === false) {
                this.css.style.backgroundColor = this.fontColor;
                this.css.style.color = this.color;
            }
        });
        this.css.addEventListener('click', () => this.changeState());
        this.initStatus = true;
    }
    if (this.filterType === 'brand') {
        document.getElementById('brandButtons').appendChild(this.css);
    } else if (this.filterType === 'category') {
        document.getElementById('categoryButtons').appendChild(this.css);
    }
};

Button.prototype.stateReset = function() {
    this.name = this.originalState[0];
    this.css = this.originalState[1];
    this.fontColor = this.originalState[2];
    this.color = this.originalState[3];
    this.filterType = this.originalState[4];
    this.className = this.originalState[5];
    this.idName = this.originalState[6];
    this.initStatus = true;
    this.state = this.originalState[7];
};

CollectionButton.prototype.init = function(id) {
    this.css.style.backgroundColor = this.color;
    this.css.style.color = this.fontColor;
    this.css.innerHTML = this.name;
    this.css.className = this.className;
    this.id = id;
    this.css.style.width = '200px';
    this.css.style.height = 'auto';
    this.css.style.fontSize = '16px';
    this.css.style.display = 'flex';
    this.css.style.justifyContent = 'center';
    this.css.style.borderRadius = '10px';
    this.css.style.padding = '10px';
    this.css.style.boxShadow = '0px 2px 10px 1px lightgray';
    this.css.addEventListener('mouseleave', () => {
        if (this.state === false) {
            this.css.style.backgroundColor = '#fafafa';
            this.css.style.color = 'black';
        } else if (this.state === true) {
            this.css.style.backgroundColor = '#67cf67';
            this.css.style.color = 'white';
        }
    });
    this.css.addEventListener('mouseenter', () => {
        if (this.state === false) {
            this.css.style.backgroundColor = '#67cf67';
            this.css.style.color = 'white';
        } else if (this.state === true) {
            this.css.style.backgroundColor = '#fafafa';
            this.css.style.color = 'black';
        }
    });
    this.css.addEventListener('click', () => {
        if (this.state === false) {
            this.css.style.backgroundColor = '#67cf67';
            this.css.style.color = '#fafafa';
            this.css.innerHTML = 'Collected';
            for (item of collection) {
                if (item.id === this.id) {
                    item.owned = 'true';
                };
                continue;
            }
            this.state = true;
        } else if(this.state === true) {
            this.css.style.backgroundColor = '#fafafa';
            this.css.style.color = 'black';
            this.css.innerHTML = 'Not Collected';
            for (item of collection) {
                if (item.id === this.id) {
                    item.owned = 'false';
                };
                continue;
            }
            this.state = false;
        }
    });
}


/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Prototype Methods for Forms:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Init Prototype Method for New Item Form
Form.prototype.init = function (){
    //Activates Overlay and instantiates container for selected form.
    document.getElementById('overlay').classList.add('active');
    this.css.id = this.name;
    document.body.appendChild(this.css);
    this.css.classList.add('active');
    //Instantiates the form for a new item.
    if (this.type === 'itemPopUp') {
        newElement('div','id', 'popUpHeader', this.css);
        newElement('div','id', 'popUpTitle', document.getElementById('popUpHeader'), 'New Item');
        newElement('button','class', 'closeButton', document.getElementById('popUpHeader'), 'X',
        [{type:'click', function:() => {
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
            }
        }]);
        newElement('div','id', 'popUpBody', this.css);
        newElement('div', false, null, document.getElementById('popUpBody'), 'Item Name:');
        let nameText = document.createElement('input')
        nameText.type = 'text';
        nameText.id = 'nameBox'
        document.getElementById('popUpBody').appendChild(nameText);
        newElement('div', false, null, document.getElementById('popUpBody'), 'Image URL (Not Required):');
        let imgURL = document.createElement('input')
        imgURL.type = 'text';
        imgURL.id = 'imgURL'
        document.getElementById('popUpBody').appendChild(imgURL);
        newElement('div', false, null, document.getElementById('popUpBody'), 'Year:');
        let year = document.createElement('input')
        year.type = 'text';
        year.id = 'yearText'
        document.getElementById('popUpBody').appendChild(year);
        //Cateogry Drop down
        newElement('div', false, null, document.getElementById('popUpBody'), 'Category:', null);
        newSelectBox('custom-select', 'width:200px;', 'Category', 'categorySelect', document.getElementById('popUpBody'), categoryArray);
        //Brand Drop down
        newElement('div', false, null, document.getElementById('popUpBody'), 'Brand:');
        newSelectBox('custom-select', 'width:200px;', 'Brand', 'brandSelect', document.getElementById('popUpBody'), brandArray);
        //Collection Status Drop Down
        newElement('div', false, null, document.getElementById('popUpBody'), 'Collected:');
        newSelectBox('custom-select', 'width:200px;', 'Collected', 'collectedSelect', document.getElementById('popUpBody'),
        [{optionValue:'null', optionText:'----'}, {optionValue:Boolean(true), optionText:'Yes'}, {optionValue:Boolean(false), optionText:'No'}])
        newElement('button','id', 'addButton', document.getElementById('popUpBody'), 'Add',
            [
                {type:'click', function: () => {
                    let newItem = new Item(
                        nameText.value,
                        document.getElementById('categorySelect').value,
                        document.getElementById('brandSelect').value,
                        year.value,
                        document.getElementById('collectedSelect').value,
                        imgURL.value,
                        true);
                    newItem.init();
                    document.body.removeChild(this.css);
                    document.getElementById('overlay').classList.remove('active');
                    checkMiddleContainer();
                    }
                }

            ]
        );
        //Instantiates the form for a new category.
    } else if (this.type === 'categoryPopUp') {
        newElement('div','id', 'popUpHeader', this.css);
        newElement('div','id', 'popUpTitle', document.getElementById('popUpHeader'), 'New Category');
        newElement('button','class', 'closeButton', document.getElementById('popUpHeader'), 'X',
        [{type:'click', function:() => {
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
            }
        }]);
        newElement('div','id', 'popUpBody', this.css);
        let nameText = document.createElement('input')
        nameText.type = 'text';
        nameText.id = 'nameBox'
        document.getElementById('popUpBody').appendChild(nameText);
        newElement('button','id', 'addButton', document.getElementById('popUpBody'), 'Add',
        [{type: 'click', function: () => {
            categoryArray.push({optionValue:String(nameText.value), optionText:String(nameText.value)});
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
        }
        }]);
        //Instantiates the form for a new brand.
    } else if (this.type === 'brandPopUp') {
        newElement('div','id', 'popUpHeader', this.css);
        newElement('div','id', 'popUpTitle', document.getElementById('popUpHeader'), 'New Brand');
        newElement('button','class', 'closeButton', document.getElementById('popUpHeader'), 'X',
        [{type:'click', function:() => {
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
            }
        }]);
        newElement('div','id', 'popUpBody', this.css);
        let nameText = document.createElement('input')
        nameText.type = 'text';
        nameText.id = 'nameBox'
        document.getElementById('popUpBody').appendChild(nameText);
        newElement('button','id', 'addButton', document.getElementById('popUpBody'), 'Add', [{type:'click', function:() => {
            brandArray.push({optionValue:String(nameText.value), optionText:String(nameText.value)});
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
            }
        }]);

    }
    this.initValue = true;
}




/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Utility Functions:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/

function showAndHide(elementId) {
    if (document.getElementById(elementId).style.display === 'none') {
        document.getElementById(elementId).style.display = 'flex';
    } else if (document.getElementById(elementId).style.display === 'flex')
    document.getElementById(elementId).style.display = 'none';
}

function updateContainer(array) {
    let container = document.getElementById("middleContainer");
    for (i = 0; i < array.length; i++) {
        if (collection[i].inContainer === true) {
            continue
        };
        // Create card here according to prior specs
        let newDiv = document.createElement("div");
        newDiv.textContent = `${array[i].name}, Category: ${array[i].category}, Brand: ${array[i].brand}, Year: ${array[i].year}, Ownership: ${array[i].owned}`;
        container.appendChild(newDiv);
        collection[i].inContainer = true;
    };
}

function newElement (elementType, selector, selectorName, target, content, eventListeners) {
    let element = document.createElement(elementType);
    if (selector === false) {
            if (content) {
                element.innerHTML = content
            }
        target.appendChild(element);
    } else if (content) {
        element.innerHTML = content
        element.setAttribute(selector, selectorName);
        target.appendChild(element);
    } else
    element.setAttribute(selector, selectorName);
    target.appendChild(element);
    if (eventListeners) {
        for (eL of eventListeners) {
            element.addEventListener(eL.type, eL.function)
        }
    }
}

function newSelectBox (classNameDiv, divStyle, selectName, selectId, target, optionArray) {
    let category = document.createElement('div')
    category.setAttribute('class', classNameDiv);
    category.style = divStyle
    target.appendChild(category);
    let select = document.createElement('select')
    select.name = selectName;
    select.id = selectId;
    category.appendChild(select);
    newOption(optionArray, select);
}

function newOption (options, target) {
    for (op of options) {
        let option = document.createElement('option');
        option.value = op.optionValue;
        option.innerHTML = op.optionText;
        target.appendChild(option);
    }
}

function createId () {
    if (collection.length < 1) {
        return 1;
    }
    let sortedCollection = collection.slice(0);
    sortedCollection.sort((a,b) => {
        if (a.id > b.id) {
            return -1;
        } else if (a.id < b.id) {
            return 1;
        };
    })
    let highestId = sortedCollection[0].id;
    return highestId + 1;
}

function checkMiddleContainer () {
    for (item of collection) {
        if (item.id >= 10) {
            item.css.style.display = 'none';
        }
    }

}

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Filter Functions, Methods, and Objects:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/

function finalFilter (filterState, array) {
    let filterValues = Object.values(filterState);
    let filterKeys = Object.keys(filterState);
    let firstArray = [];
    let selectedArray = [];
    let nullCount = 0;
    for (i = 0; i <=3; i++) {
        if (filterValues[i] === 'null') {
            nullCount += 1
        }
        if (filterValues[i] !== 'null') {
            selectedArray.push(filterKeys[i]);
        }
    }
    if (nullCount === 4) {return collection};
    firstArray = array.filter((item) => {
        if((item.category === filterValues[0] || filterValues[0] === 'null') &&
        (item.brand === filterValues[1] || filterValues[1] === 'null') &&
        (item.year === filterValues[2] || filterValues[2] === 'null') &&
        (item.owned === filterValues[3] || filterValues[3] === 'null')) {
            console.log('true');
                return true;
        }
    });
    return firstArray;
}



function getFilterState(category, brand, year, collection) {
    let state = {'category':category.value, 'brand':brand.value, 'year':year.value, 'collection':collection.value};
    console.log(state);
    return state;
}

function CardContainer (min, max) {
    this.min = min;
    this.max = max;
    this.display = this.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection));
}

CardContainer.prototype.displayUpdate = function (array) {
    //Sets newArray to contain objects with indexes between min and max.
    let newArray = array.filter((item) => array.indexOf(item) <= this.max && array.indexOf(item) > this.min);
    //Changes css display of each card div to none if collection id is not in newArray
    let newArrayIds = newArray.map((item) => item.id);
    console.log(`New Array: ${newArrayIds}`)
    array.forEach((item) => {item.css.style.display = 'none'});
    array.forEach((item) => {

        //LEFT OFF HERE. Else if statement is not working.
        if (newArrayIds.includes(item.id)) {
            item.css.style.display = 'flex';
        } else if (!newArrayIds.includes(item.id)) {
            console.log(item);
            item.css.style.display = 'none';
            }
    });
    return newArray;
}

CardContainer.prototype.shift = function (direction) {
    if (direction === 'right') {
        if (this.display.length < 9) {
            return
        }
        this.min += 9;
        this.max += 9;
        this.display = this.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection));
        if (this.display.length === 0) {
            this.min -= 9;
            this.max -= 9;
            this.display = this.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection));
        }
    }
    if (direction === 'left') {
        if (this.min === -1 && this.max === 8){
            return;
        }
        this.min -= 9;
        this.max -= 9;
        if (this.display.length === 0) {
            this.min += 9;
            this.max += 9;
        }
        this.display = this.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection));
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getValues (array) {
    let arrayValues = [];
    for (item of array) {
        let itemValues = Object.values(item);
        itemValues.splice(0,1);
        itemValues.splice(4,1);
        arrayValues.push(itemValues);
    }
    return arrayValues;
}

function displayOutput (collection) {
    let container = document.getElementById('middleContainer');
    let childNodes = container.children
    for (item of childNodes){
        item.style.display = 'none';
    };
}

function filterMenu (option) {
    if (option === 'enable') {
    let mainContainer = document.getElementById('mainContainer');
    newElement('div','id', 'filter', mainContainer, false);
    //Make sure that filter appears below topContainer:
    mainContainer.insertBefore(document.getElementById('filter'), mainContainer.children[1]);
    //Left filter container.
    newElement('div','id', 'leftFilterContainer', document.getElementById('filter'), false);
    //Categories
    newElement('div', 'id', 'category', document.getElementById('leftFilterContainer'), 'Category:', null);
    document.getElementById('category').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Category', 'selectCategory', document.getElementById('category'), categoryArray);
    //Brands
    newElement('div', 'id', 'brand', document.getElementById('leftFilterContainer'), 'Brand:', null);
    document.getElementById('brand').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Brand', 'selectBrand', document.getElementById('brand'), brandArray);
    //Right filter Container
    newElement('div','id', 'rightFilterContainer', document.getElementById('filter'), false);
    //Year Select
    newElement('div', 'id', 'year', document.getElementById('rightFilterContainer'), 'Year:', null);
    document.getElementById('year').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Year', 'selectYear', document.getElementById('year'), yearArray);
    //Collection Status Select
    newElement('div', 'id', 'collectionStatus', document.getElementById('rightFilterContainer'), 'Collected:', null);
    document.getElementById('collectionStatus').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Collected', 'selectCollection', document.getElementById('collectionStatus'),
    [{optionValue:'null', optionText:'----'}, {optionValue:'Yes', optionText:'Yes'}, {optionValue:'No', optionText:'No'}])
    document.getElementById('filterImgG').style.display = 'none';
    document.getElementById('filterImgB').style.display = 'flex';
    let newContainer = new CardContainer(-1, 8);
    document.getElementById('selectCategory').addEventListener('change', () => newContainer.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection)));
    document.getElementById('selectBrand').addEventListener('change', () => newContainer.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection)));
    document.getElementById('selectYear').addEventListener('change', () => newContainer.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection)));
    document.getElementById('selectCollection').addEventListener('change', () => newContainer.displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection)));

    } else if (option === 'disable') {
        document.getElementById('mainContainer').removeChild(document.getElementById('filter'));
        document.getElementById('filterImgG').style.display = 'flex';
        document.getElementById('filterImgB').style.display = 'none';
    }
}

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Misc:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/



let newItem = new Item('Test Trading Card1', 'TCG', 'Pokemon', 1999, false, 'Pictures/image_placeholder.png', true, id = 1)
let newItem2 = new Item('Test Shoe1', 'Shoes', 'Nike', 2004, false, 'Pictures/image_placeholder.png', true, id = 2)
let newItem3 = new Item('Test Sports Card1', 'Sports Cards', 'MLB', 1980, false, 'Pictures/image_placeholder.png', true, id = 3)
let newItem4 = new Item('Test Comic Book1', 'Comic Books', 'Marvel', 1960, false, 'Pictures/image_placeholder.png', true, id = 4)
let newItem5 = new Item('Test Comic Book2', 'Comic Books', 'Marvel', 1960, false, 'Pictures/image_placeholder.png', true, id = 5)
let newItem6 = new Item('Test Trading Card2', 'TCG', 'Pokemon', 1999, false, 'Pictures/image_placeholder.png', true, id = 6)
let newItem7 = new Item('Test Trading Card3', 'TCG', 'Pokemon', 1999, false, 'Pictures/image_placeholder.png', true, id = 7)
let newItem8 = new Item('Test Shoe2', 'Shoes', 'Nike', 2004, false, 'Pictures/image_placeholder.png', true, id = 8)
let newItem9 = new Item('Test Shoe3', 'Shoes', 'Nike', 2004, false, 'Pictures/image_placeholder.png', true, id = 9)
let newItem10 = new Item('Test Shoe4', 'Shoes', 'Nike', 2004, false, 'Pictures/image_placeholder.png', true, id = 10)

newItem.init();
newItem2.init();
newItem3.init();
newItem4.init();
newItem5.init();
newItem6.init();
newItem7.init();
newItem8.init();
newItem9.init();
newItem10.init();
