let roleLogistics = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let finishedWithdrawing = false;

        if (creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    //console.log("Structures Found " + structure.structureType)
                    if (structure.structureType == STRUCTURE_CONTAINER) {
                        if (structure.store.getUsedCapacity([RESOURCE_ENERGY]) != 0) {
                            return true
                        }
                    }
                    return false
                }

            });
            // if sources != null then withdraw
            console.log("sources.length=" + sources.length)
            if (sources.length != 0) {
                if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else {
                finishedWithdrawing = true;
            }

        }
        else {
            finishedWithdrawing = true;
        }

        if (finishedWithdrawing == true) {
            console.log("hello")
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        //structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleLogistics;