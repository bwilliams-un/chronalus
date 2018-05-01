/**
 * 
 * This chronalus should work as follows:
 *  - Singleton by default
 *  - Module registers with the Chronalus for a stage with a start function (on)
 *  - When the stage is reached, run each start function (emit)
 *  - Module calls Chronalus.Next when it is finished
 *  - Module calls Chronalus.Next(shutdown) if it fails // Should we have a failure option to short circuit out of the lifecycle?
 *  - When Chronalus Next is called, check if all registrations for that stage have checked in
 *      - if so, move to the next stage
 */