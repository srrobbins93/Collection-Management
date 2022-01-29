// Initialization of required variables and objects.
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
let collection = [];
let categorySelector = document.getElementById('selectCategory');
let brandSelector = document.getElementById('selectBrand');
let yearSelector = document.getElementById('selectYear');
let collectionSelector = document.getElementById('selectCollection');
let min = -1;
let max = 8;


let brandArray = [
    {optionValue:'null', optionText:'----'},
    {optionValue:'Pokemon', optionText:'Pokemon'},
    {optionValue:'MTG', optionText:'MTG'},
    {optionValue:'NFL', optionText:'NFL'},
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
    {optionValue:'null', optionText:'----'},
    {optionValue: '1963', optionText:'1963'},
    {optionValue: '1980', optionText:'1980'},
    {optionValue:'1993', optionText:'1993'},
    {optionValue:'1999', optionText:'1999'},
    {optionValue:'2010', optionText:'2010'},


];

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
        if (this.cardImage === '') {
            this.cardImage = 'Pictures/image_placeholder.png';
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
                if (nameText.value.length > 18) {
                    throwError('input');
                    return;
                } else if (nameText.value.length === 0) {
                    throwError('empty');
                    return;
                } else if (year.value.length > 4) {
                    throwError('year');
                    return;
                } else if (isNaN(year.value)) {
                    throwError('yearNotNumber');
                    return;
                } else if (year.value.length === 0) {
                    throwError('empty');
                    return;
                }
                let newItem = new Item(
                    nameText.value,
                    document.getElementById('categorySelect').value,
                    document.getElementById('brandSelect').value,
                    year.value,
                    document.getElementById('collectedSelect').value,
                    imgURL.value,
                    true);
                    newItem.init();
                    let yearValue = document.getElementById('yearText').value
                    yearArray.push({optionValue:String(yearValue), optionText:String(yearValue)});
                    console.log(yearArray)
                    updateOptions('year');
                    document.body.removeChild(this.css);
                    document.getElementById('overlay').classList.remove('active');
                    checkMiddleContainer();
                    displayUpdate(collection);
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
        if (nameText.value.length > 10) {
            throwError('other');
            return;
        } else if (nameText.value.length === 0) {
            throwError('empty');
            return;
        };
        categoryArray.push({optionValue:String(nameText.value), optionText:String(nameText.value)});
        updateOptions('category');
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
    if (nameText.value.length > 10) {
        throwError('other');
        return;
    } else if (nameText.value.length === 0) {
        throwError('empty');
        return;
    };
    brandArray.push({optionValue:String(nameText.value), optionText:String(nameText.value)});
    updateOptions('brand');
    document.body.removeChild(this.css);
    document.getElementById('overlay').classList.remove('active');
}
}]);

}
this.initValue = true;
}

function throwError (type) {
    let errorScreen = document.getElementById('error');
    let errorButton = document.getElementById('errorButton');
    let errorMsg = document.getElementById('errorMsg');
    let overlay = document.getElementById('overlay');
    errorScreen.classList.add('active');
    overlay.classList.add('active');
    if (type === 'input') {
        errorMsg.innerHTML = 'Character length of Item Name is too long. Please limit number of characters to 18.';
    } else if (type === 'year') {
        errorMsg.innerHTML = 'Character length of year is too long. Please limit number of characters to 4.';
    } else if (type === 'yearNotNumber') {
        errorMsg.innerHTML = 'Your input for year must be a number.';
    } else if (type === 'other') {
        errorMsg.innerHTML = 'Character length of Item Name is too long. Please limit number of characters to 10.';
    } else if (type === 'empty') {
        errorMsg.innerHTML = 'Your input can not be empty. Please try again.';
    }
    errorButton.addEventListener('click', () => {
        errorScreen.classList.remove('active');
    })
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

function updateOptions (type) {
    if (type === 'category' || type === 'all') {
        let category = document.getElementById('selectCategory');
        removeAllChildNodes(category)
        newOption(categoryArray, category);
    }
    if (type === 'brand'|| type === 'all') {
        let brand = document.getElementById('selectBrand');
        removeAllChildNodes(brand);
        newOption(brandArray, brand);
    }
    if (type === 'year'|| type === 'all') {
        let year = document.getElementById('selectYear');
        removeAllChildNodes(year);
        newOption(yearArray, year);
    };

}

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Filter/Search Functions, Methods, and Objects:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
function search (target, filterState) {
    let array = finalFilter(filterState, target)
    let searchArray = [];
    for (item of array) {
      let target = item.name.toLowerCase();
      let input = document.getElementById('searchBox').value.toLowerCase();
      if (input === '') {
        return collection
        } else if (target.includes(input)) {
            item.css.style.display = 'flex'
            searchArray.push(item);
        } else if (!target.includes(input)) {
            item.css.style.display = 'none';
        }
    }
    console.log(searchArray);
    return displayUpdate(searchArray);
}

function finalFilter (filterState, array) {
    let filterValues = Object.values(filterState);
    let filterKeys = Object.keys(filterState);
    let firstArray = [];
    let selectedArray = [];
    let notSelectedArray = [];
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
            return true;
        }
        notSelectedArray.push(item);
    });
    notSelectedArray.forEach(item => item.css.style.display = 'none');
    return displayUpdate(firstArray);
}



function getFilterState(category, brand, year, collection) {
    let state = {'category':category.value, 'brand':brand.value, 'year':year.value, 'collection':collection.value};
    return state;
}

/*
Current Structure of Filter Algo:
(1) Filter state is obtained using getFilterState(). This represents the state of the filter selectors so that it can be used
    to filter the collection array.
(2) If filter button is clicked, the filter state is passed to finalFilter()[! Fix function name for readability]
    along with the collection to filter the collection array based on the filterState and return a new array that
    will be past to displayUpdate().
(3) The new array from finalFilter is passed to displayUpdate and is filtered so that only 9 cards are displayed at a time
    based on 9 items in the array being present in the return array at any given time.
*/


const MinMaxState = () => {
    let max = 8;
    let min = -1;
    let page = document.getElementById('pageNumber');
    const incrementMinMax = () => {min += 9; max += 9; page.innerHTML = Number(page.innerHTML) + 1};
    const decrementMinMax = () => {min -= 9; max -= 9; page.innerHTML = Number(page.innerHTML) - 1};
    const getMin = () => min;
    const getMax = () => max;
    return {incrementMinMax, decrementMinMax, getMin, getMax}
}

let minMax = MinMaxState();

function displayUpdate (filteredArray) {
    let array = filteredArray;
    //Sets newArray to contain objects with indexes between min and max.
    let newArray = array.filter((item) => array.indexOf(item) <= minMax.getMax() && array.indexOf(item) > minMax.getMin());
    //Changes css display of each card div to none if collection id is not in newArray
    let newArrayIds = newArray.map((item) => item.id);
    array.forEach((item) => {item.css.style.display = 'none'});
    //FIX LOGIC HERE.
    array.forEach((item) => {
        if (newArrayIds.includes(item.id)) {
            item.css.style.display = 'flex';
        } else if(!newArray.includes(item.id)) {;
            item.css.style.display = 'none';
        }
    });
    return newArray;
}

function shift (direction) {
    let array = toggleDisplayArray();
    if (direction === 'right') {
        if (array.length < 9) {
            return
        };
        minMax.incrementMinMax()
        toggleDisplayArray()
        if (array.length === 0) {
            minMax.decrementMinMax()
            toggleDisplayArray();
        };
    };
    if (direction === 'left') {
        if (minMax.getMin() === -1 && minMax.getMax()  === 8){
            return;
        };
        minMax.decrementMinMax()
        if (array.length < 9 === 0) {
            minMax.incrementMinMax()
        };
        toggleDisplayArray();
    };
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

function toggleDisplayArray() {
    if (document.getElementById('searchBox').value) {
        return search(collection, getFilterState(selectCategory, selectBrand, selectYear, selectCollection))
    }
    console.log('works')
    return displayUpdate(finalFilter(getFilterState(selectCategory, selectBrand, selectYear, selectCollection), collection));
}

function filterMenu (option) {
    if (option === 'enable') {
        document.getElementById('filterImgG').style.display = 'none';
        document.getElementById('filterImgB').style.display = 'flex';
        document.getElementById('filter').style.display = 'flex';
    } else if (option === 'disable') {
        document.getElementById('filterImgG').style.display = 'flex';
        document.getElementById('filterImgB').style.display = 'none';
        document.getElementById('filter').style.display = 'none';
    }
}




/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Misc:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/



let newItem = new Item('Black Lotus', 'TCG', 'MTG', '1993', 'false', 'https://preview.redd.it/jk2oxx8cq4m21.png?auto=webp&s=4bf9fa1dc7dbc424585aec832f4068c64290d03c', true, id = 1)
let newItem2 = new Item('White Airforce One', 'Shoes', 'Nike', '2010', 'false', 'https://i.pinimg.com/originals/37/83/12/3783124e847169fc0dcda716c8dbc9db.png', true, id = 2)
let newItem3 = new Item('Peyton Manning', 'Sports Cards', 'NFL', '1999', 'false', 'https://cconnect.s3.amazonaws.com/wp-content/uploads/2021/02/1998-Playoff-Contenders-Rookie-Ticket-Autograph-Peyton-Manning-RC-87-10-Best-Peyton-Manning-Rookie-Cards-of-All-Time-thumb-700.jpg', true, id = 3)
let newItem4 = new Item('The Amazing Spirderman', 'Comic Books', 'Marvel', '1960', 'false', 'https://i.annihil.us/u/prod/marvel/i/mg/d/40/5196582d03800/clean.jpg', true, id = 4)
let newItem5 = new Item('The Avengers', 'Comic Books', 'Marvel', '1960', 'false', 'https://i.annihil.us/u/prod/marvel/i/mg/3/d0/519b819d54e34/clean.jpg', true, id = 5)
let newItem6 = new Item('Charizard', 'TCG', 'Pokemon', '1999', 'true', 'https://den-cards.pokellector.com/197/Charizard.EVO.11.13280.png', true, id = 6)
let newItem7 = new Item('Jace, The Mind Sculptor', 'TCG', 'MTG', '2018', 'true', 'https://c1.scryfall.com/file/scryfall-cards/png/front/c/0/c057dc0d-4017-4e60-9c5e-45fc569a8d31.png?1562440655', true, id = 7)
let newItem8 = new Item('Cream Airforce One', 'Shoes', 'Nike', '2010', 'true', 'https://cdn.shopify.com/s/files/1/0602/3187/6778/products/b9a00d66361ebbfa4211596ebe274c8e_1024x1024.jpg?v=1636441591', true, id = 8)
let newItem9 = new Item('Blue Airforce One', 'Shoes', 'Nike', '2010', 'false', 'https://i.pinimg.com/564x/f1/25/87/f125878ee1d9a9177a8e035d205b8b2c.jpg', true, id = 9)
let newItem10 = new Item('Lilac Airforce One', 'Shoes', 'Nike', '2010', 'false', 'https://i.pinimg.com/564x/17/e6/fd/17e6fd792cdffa9587de64d1a593021e.jpg', true, id = 10)

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


updateOptions('all');
//Left and Right Page Arrow
document.getElementById('leftScroll').addEventListener('click', () => {
    shift('left', 'start');
    toggleDisplayArray();
    });
document.getElementById('rightScroll').addEventListener('click', () => {
    shift('right', 'start');
   toggleDisplayArray();
    });
//Filter Select Boxes
document.getElementById('selectCategory').addEventListener('change', () => {
    toggleDisplayArray();
    //document.getElementById('searchBox').value = '';
    });
document.getElementById('selectBrand').addEventListener('change', () => {
    toggleDisplayArray();
    document.getElementById('searchBox').value = '';
    });
document.getElementById('selectYear').addEventListener('change', () => {
    toggleDisplayArray();
    document.getElementById('searchBox').value = '';
    });
document.getElementById('selectCollection').addEventListener('change', () => {
    toggleDisplayArray();
    document.getElementById('searchBox').value = '';
    });
document.getElementById('searchBox').addEventListener('keyup', () =>  toggleDisplayArray());
toggleDisplayArray();
