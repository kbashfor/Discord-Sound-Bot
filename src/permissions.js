function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
    return (pluck(mem.roles).includes(role));
}

module.exports = {hasRole}