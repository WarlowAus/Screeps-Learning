var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleLogistics = require('role.logistics');

module.exports.loop = function () {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'harvester' } });
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');//[WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
    //console.log('Builders: ' + builders.length);

    if (builders.length < 3) {
        var newName = 'BigBuilder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'builder' } });
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgraders.length);

    if (upgraders.length < 2) {
        var newName = 'BigUpgraders' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'upgrader' } });
    }
    var logistics = _.filter(Game.creeps, (creep) => creep.memory.role == 'logistics');
    //console.log('Logistics: ' + logistics.length);

    if (logistics.length < 1) {
        var newName = 'BigLogistics' + Game.time;
        console.log('Spawning new logisticsBot: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'logistics' } });
    }

    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    //console.log('repairers: ' + repairers.length);

    if (repairers.length < 1) {
        var newName = 'Repairers' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'repairer' } });
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }

        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'logistics') {
            roleLogistics.run(creep);
        }
    }
    for (var name in Game.rooms) {
        console.log('Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Harvesters: ' + harvesters.length + ' || And Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }
}