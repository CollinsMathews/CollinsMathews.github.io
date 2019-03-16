var test = [[0, 0.2, 0.3, 0.1],
        [0, 0.8, 0.2, 0],
        [0.1, 0.8, 0, 0.1],
        [0.6, 0.1, 0.2, 0.1]];

var matrix = [[1, 2, 3],
              [1, 2, 3],
              [1, 2, 3]];

min_matrix = matrix.map(value => value.map(value => -value));

/**
* Munkres is an object. It can compute different matrices that are passed through it.
*/
var m = new Munkres();

/**
* 'indices' is formated as [[row, best col], [row, best col]...]
* e.g [[user1, best shift], [user2, best shift],...,[user_n, best shift]]
*/
var indices = m.compute(min_matrix);


console.log(format_matrix(matrix), '\nHighest preferences for this matrix:');
var total = 0;
for (var i = 0; i < indices.length; ++i) {
    var row = indices[i][0], col = indices[i][1];
    var value = matrix[row][col];
    total += value;

    console.log('(' + row + ', ' + col + ') -> ' + value);
}

console.log('total cost:', total);