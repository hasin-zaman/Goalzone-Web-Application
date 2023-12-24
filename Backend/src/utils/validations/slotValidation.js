function isValidTimeFormat(time) {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
}

function isValidTimeGap(startTime, endTime) {
    
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    let startTotalMinutes = startHours * 60 + startMinutes;
    let endTotalMinutes = endHours * 60 + endMinutes;

    if(endTotalMinutes < startTotalMinutes) {
        endTotalMinutes += 24 * 60;
    }

    const timeDifference = endTotalMinutes - startTotalMinutes;

    return timeDifference >= 30 && timeDifference <= 120;
}

function isSlotClashing(startTime, endTime, slots) {
    const startHours=startTime.getHours();
    const startMinutes=startTime.getMinutes();

    const endHours=endTime.getHours();
    const endMinutes=endTime.getMinutes();

    for(const slot of slots) {
        const existingStartHours=slot.startTime.getHours();
        const existingStartMinutes=slot.startTime.getMinutes();
        const existingEndHours=slot.endTime.getHours();
        const existingEndMinutes=slot.endTime.getMinutes();
        
        if (
            (startHours > existingStartHours || (startHours === existingStartHours && startMinutes >= existingStartMinutes)) &&
            (startHours < existingEndHours || (startHours === existingEndHours && startMinutes < existingEndMinutes)) ||
            (endHours > existingStartHours || (endHours === existingStartHours && endMinutes > existingStartMinutes)) &&
            (endHours < existingEndHours || (endHours === existingEndHours && endMinutes <= existingEndMinutes))
        ) {
            return true; 
        }   
    }
    return false;
}

module.exports = {
    isValidTimeFormat,
    isValidTimeGap,
    isSlotClashing
};