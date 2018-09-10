// Laser weapon module.
function laserCode(station, level) {
    var range = 1000;
    var shootTimer = 0;
    var shootCost = 0.1;
    return {
        type: ORBITAL_MODULE_TYPE.LASER,
        level: level,
        update: function() {
            if (!shootTimer--) {
                shootTimer = 2;// - Math.min(level / 10, 2);
                var target = EnemyShip.nearest(station, range);
                if (target && Base.energy >= shootCost) {
                    Base.energy -= shootCost;
                    var miss = Math.random() > 0.5;
                    var life = miss ? 2000 : getDistance(station, target);
                    var dir = getAngle(station, target);
					station.aimDirection = dir;
                    Laser.create(station.x, station.y, dir, life, "#0F0");
                    if (!miss) {
                        target.hp -= 2;
                    }

					// Sound effect.
					if (Math.random() > 0.7) {
						var index = ~~(Math.random()*laserSounds.length);
						playSound(laserSounds[index]);
					}

                }
            }
        }
    }
}
