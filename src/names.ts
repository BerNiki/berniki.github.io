const soldierNames = [
        "Annia Dragonius",
        "Houston Alpha",
        "Bloodfiend",
        "Radium",
        "Cadet Spike",
        "Sgt. Pusher",
        "Owl Pacino",
        "Bad Bunny",
        "Scrapper",
        "Graphite",
        "Obsidian Inferno",
        "FastLane Zero",
        "Sargent Magnetite",
        "Captain Peroxide",
        "Mustang",
        "Pearl Girl",
        "IceDart",
        "Vape Dimension",
        "Vaping Beerus II",
        "Radioactive-Man",
        "Sidewalk Enforcer",
        "Boom Blaster",
        "Nitro",
        "Slash Flash",
        "Materia Hogger",
        "Sapphyroth",
]

export function soldierNameGenerator () {
    const randomIndexGenerator = Math.round(Math.random() * (soldierNames.length - 1));
    const soldierName = soldierNames[randomIndexGenerator];
    return soldierName;
}