export const sortByCreatedAt = (arr = [], desc = true) => {
  const sortedArr = arr.sort((a, b) => {
    const {
      sys: { createdAt: createdAtFirst },
    } = a;
    const {
      sys: { createdAt: createdAtSecond },
    } = b;

    const firstDate = new Date(createdAtFirst).getTime();
    const secondDate = new Date(createdAtSecond).getTime();

    return desc === true ? secondDate - firstDate : firstDate - secondDate;
  });
  return sortedArr;
};

//
//

export const getAllSortedDataContenful = (allDataContenful = []) => {
  //
  return allDataContenful.reduce((resultObj, currContentObj, index, arr) => {
    const currId = currContentObj.sys.contentType.sys.id;

    // inner reduce
    // counting number of times each content type appears
    // returned shape: {contentType1: times appeared, contentType2: times appeared,....}

    const contentTypesCount = arr.reduce(
      //
      (resultObj, currContent) => {
        //
        const currId = currContent.sys.contentType.sys.id;

        !resultObj[currId]
          ? (resultObj[currId] = 1)
          : (resultObj[currId] = resultObj[currId] + 1);

        return resultObj;
      },
      {}
    );
    // inner reduce ends

    // outer reduce continue
    // if currId contentTypesCount === 1 we know it is a single obj; no arr of obj req.

    if (!resultObj[currId] && contentTypesCount[currId] === 1) {
      resultObj[currId] = currContentObj;
    } //
    // otehrwise contentTypesCount of currId will be > 1 always; no need to check
    // and we staright up create arr of obj for the currID
    //
    else {
      // currId doesn't exist yet? ; create arr and put the curr content obj

      !resultObj[currId]
        ? (resultObj[currId] = [currContentObj])
        : // otherwise push the next contentType that matches
          resultObj[currId].push(currContentObj);
    }

    return resultObj;
  }, {});
};

export const getPrevNextProj = (arr = [], currProjectData = {}) => {
  const indexCurrProject = arr.indexOf(currProjectData);

  let indexPreviousProject = indexCurrProject - 1;
  if (indexPreviousProject < 0) indexPreviousProject = arr.length - 1;

  let indexNextProject = indexCurrProject + 1;
  if (indexNextProject > arr.length - 1) indexNextProject = 0;

  const prevProject = arr[indexPreviousProject].fields.projectName;
  const nextProject = arr[indexNextProject].fields.projectName;
  return [prevProject, nextProject];
};
