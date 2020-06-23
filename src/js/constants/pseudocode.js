const insert = [
    { text: 'Если у дерева нет корня, вставляем вершину и завершаем алгоритм.', indentLevel: 0, highlightColor: '#cf8859' }, 
    { text: 'Ключ вставляемой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Нет: вставляем вершину в качестве левого ребенка текущей вершины.', indentLevel: 2, highlightColor: '#fcd462' }, 
    { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины', indentLevel: 2, highlightColor: '#fcd462' }, 
    { text: 'Если ==: данная вершина уже находится в дереве.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Нет: вставляем вершину в качестве правого ребенка текущей вершины.', indentLevel: 2, highlightColor: '#fcd462' }, 
    { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 2, highlightColor: '#fcd462' }, 
    { text: 'Конец вставки.', indentLevel: 0, highlightColor: '#cf8859' }, 
];

const find = [
    { text: 'Ключ искомой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 0, highlightColor: '#cf8859' }, 
    { text: 'Если ==: данная вершина есть в дереве.', indentLevel: 1, highlightColor: '#e7d0ad' }, 
    { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
    { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
    { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
    { text: 'Нет: вершины нет в дереве.', indentLevel: 2, highlightColor: '#ECDABF' }, 
    { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины', indentLevel: 2, highlightColor: '#ECDABF' }, 
    { text: 'Поиск окончен.', indentLevel: 0, highlightColor: '#cf8859' }, 
];

const remove = [
    { text: 'Ключ удаляемой вершины меньше, равен или больше ключа в текущей вершине?', indentLevel: 0, highlightColor: '#cf8859' }, 
    { text: 'Если ==: рассматриваем детей текущей вершины...', indentLevel: 1, highlightColor: '#e7d0ad' }, 
    { text: 'Если нет ни одного ребенка: удаляем данную вершину', indentLevel: 2, highlightColor: '#e7d0ad' }, 
    { text: 'Если нет только левого ребенка: правый ребенок текущей вершины занимает место текущей вершины, становясь новым ребенком отца текущей вершины.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
    { text: 'Есть нет только правого ребенка: левый ребенок текущей вершины занимает место текущей вершины, становясь новым ребенком отца текущей вершины.', indentLevel: 2, highlightColor: '#ECDABF' }, 
    { text: 'Если есть оба ребенка: у правого ребенка удаляемой вершины есть левый ребенок (внук удаляемой вершины)?', indentLevel: 2, highlightColor: '#e7d0ad' },
    { text: 'Нет: правый ребенок текущей вершины занимает место текущей вершины.', indentLevel: 3, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: тогда выполним следующие операции...', indentLevel: 3, highlightColor: '#e7d0ad' }, 
    { text: 'Найдем самого левого ребенка правого ребенка удаляемой вершины.', indentLevel: 4, highlightColor: '#e7d0ad' }, 
    { text: 'Ключ самого левого ребенка становится ключом удаляемой вершины.', indentLevel: 4, highlightColor: '#e7d0ad' }, 
    { text: 'Текущей вершиной для удаления становится самый левый ребенок.', indentLevel: 4, highlightColor: '#e7d0ad' }, 
    { text: 'Если <: у текущей вершины есть левый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
    { text: 'Нет: вершины для удаления нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: текущей вершиной становится левый ребенок текущей вершины.', indentLevel: 2, highlightColor: '#ECDABF' }, 
    { text: 'Если >: у текущей вершины есть правый ребенок?', indentLevel: 1, highlightColor: '#e7d0ad' }, 
    { text: 'Нет: вершины для удаления нет в дереве.', indentLevel: 2, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 2, highlightColor: '#ECDABF' },             
    { text: 'Удаление окончено.', indentLevel: 0, highlightColor: '#cf8859' }, 
];

const inOrderTraversal = [
    { text: 'У текущей вершины есть левый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Нет: остаемся в текущей вершине.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Печатаем текущую вершину.', indentLevel: 0, highlightColor: '#ECDABF' }, 
    { text: 'У текущей вершины есть правый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 1, highlightColor: '#ECDABF' },
    { text: 'Нет: возвращаемся из данной вершины в родительскую.', indentLevel: 1, highlightColor: '#ECDABF' },
    { text: 'Обход закончен.', indentLevel: 0, highlightColor: '#cf8859' }, 
];

const preOrderTraversal = [
    { text: 'Печатаем текущую вершину.', indentLevel: 0, highlightColor: '#ECDABF' }, 
    { text: 'У текущей вершины есть левый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Нет: остаемся в текущей вершине.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'У текущей вершины есть правый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 1, highlightColor: '#ECDABF' },
    { text: 'Нет: возвращаемся из данной вершины в родительскую.', indentLevel: 1, highlightColor: '#ECDABF' },
    { text: 'Обход закончен.', indentLevel: 0, highlightColor: '#cf8859' }, 
];

const postOrderTraversal = [
    { text: 'У текущей вершины есть левый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Нет: остаемся в текущей вершине.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'У текущей вершины есть правый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: текущей вершиной становится правый ребенок текущей вершины.', indentLevel: 1, highlightColor: '#ECDABF' },
    { text: 'Нет: остаемся в текущей вершине.', indentLevel: 1, highlightColor: '#ECDABF' },
    { text: 'Печатаем текущую вершину и вовзращаемся в родительскую вершину.', indentLevel: 0, highlightColor: '#ECDABF' }, 
    { text: 'Обход закончен.', indentLevel: 0, highlightColor: '#cf8859' }, 
];

const findMin = [
    { text: 'У текущей вершины есть левый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Нет: текущая вершина является минимумом.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Поиск закончен.', indentLevel: 0, highlightColor: '#e7d0ad' }, 
];

const findMax = [
    { text: 'У текущей вершины есть правый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Нет: текущая вершина является максимумом.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Поиск закончен.', indentLevel: 0, highlightColor: '#e7d0ad' }, 
];

const findPredecessor = [
    { text: 'У текущей вершины есть левый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Начинаем операцию поиска максимума из данной вершины...', indentLevel: 2, highlightColor: '#ECDABF' }, 
    { text: 'У текущей вершины есть правый ребенок?', indentLevel: 2, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 3, highlightColor: '#ECDABF' }, 
    { text: 'Нет: максимумом и предшественником является текущая вершина.', indentLevel: 3, highlightColor: '#ECDABF' }, 
    { text: 'Нет: следуем вверх, пока не встретим вершину, которая является правым ребенком своего родителя.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Данная вершина является правым ребенком своего родителя и искомым предшественником.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Поиск закончен.', indentLevel: 0, highlightColor: '#e7d0ad' }, 
];

const findSuccessor = [
    { text: 'У текущей вершины есть правый ребенок?', indentLevel: 0, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Начинаем операцию поиска минимума из данной вершины...', indentLevel: 2, highlightColor: '#ECDABF' }, 
    { text: 'У текущей вершины есть левый ребенок?', indentLevel: 2, highlightColor: '#e7d0ad' }, 
    { text: 'Есть: переходим в него.', indentLevel: 3, highlightColor: '#ECDABF' }, 
    { text: 'Нет: минимумом и преемником является текущая вершина.', indentLevel: 3, highlightColor: '#ECDABF' }, 
    { text: 'Нет: следуем вверх, пока не встретим вершину, которая является левым ребенком своего родителя.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Данная вершина является левым ребенком своего родителя и искомым преемником.', indentLevel: 1, highlightColor: '#ECDABF' }, 
    { text: 'Поиск закончен.', indentLevel: 0, highlightColor: '#e7d0ad' }, 
];



export { insert, find, remove, inOrderTraversal, preOrderTraversal,
    postOrderTraversal, findMin, findMax, findPredecessor, findSuccessor
}