package wetfe.core
//
///**
// * The main entry point of the WETFE AppsScript web app.
// *
// * @param e HtmlTemplate supplied by Google for this doGet event.
// */
//function doGet(e: GoogleAppsScript.HTML.HtmlTemplate) {
//    Logger.log('Heandling GET request with event template =\n%s\n', e);
//    const appkey = (typeof e.pathInfo === 'string') ? e.pathInfo.toUpperCase() : 'HOME';
//    let html = null;
//    switch (appkey) {
//        case 'ENCOUNTER':
//        html = HtmlService.createTemplateFromFile('Encounter')
//                .evaluate()
//                .setTitle('WWeb - Encounter');
//        break;
//        case 'PCMANAGER':
//        html = HtmlService.createTemplateFromFile('PCManager')
//                .evaluate()
//                .setTitle('WWeb - PC Manager');
//        break;
//        default:
//        case 'HOME':
//        html = HtmlService.createTemplateFromFile('WETFE')
//                .evaluate()
//                .setTitle('WETFE Web');
//        break;
//    }
//    return html;
//}
//
//function getCharacterDocuments() {
//    let cdocs = new Array<CharacterDocument>();
//    const player_file_search_str = 'player.json';
//    let char_folder = Main.getCharFolder();
//    if (char_folder) {
//        let player_file_iter = DriveApp.searchFiles('title contains "' + player_file_search_str + '"');
//        while (player_file_iter.hasNext()) {
//            let player_file = player_file_iter.next();
//            let file_name = player_file.getName();
//            let dot_index = file_name.indexOf('.');
//            if (dot_index < 1 || dot_index > (file_name.length - player_file_search_str.length)) {
//                // ERROR: cannot parse player name
//                continue;
//            }
//            // Verify the player file is in the WETFE/Character folder
//            let player_file_parent_itr = player_file.getParents();
//            let verified = false;
//            while (player_file_parent_itr.hasNext()) {
//                let parent_id = player_file_parent_itr.next().getId();
//                if (parent_id === char_folder.getId()) {
//                    verified = true;
//                    break;
//                }
//            }
//            if (!verified) continue;
//            let player_json = player_file.getBlob().getDataAsString();
//            cdocs.push(new CharacterDocument(
//                    player_file.getId(),
//                    char_folder.getId(),
//                    new Character(CharData.deserialize(player_json))));
//        }
//    }
//    return cdocs;
//}
//
//function createCharacterDocument() {
//    let char_folder = Main.getCharFolder();
//    if (!char_folder) {
//        throw new Error('[Main::createCharacter] ERROR: Unable to locate or create the /WETFE/Character folder.');
//    }
//    let char_data = new CharData();
//    let char_filename = char_data.key + '.player.json';
//    let char_file = char_folder.createFile(char_filename, JSON.stringify(char_data), 'application/json');
//    return new CharacterDocument(char_file.getId(), char_folder.getId(), new Character(char_data));
//}
//
//function saveCharacterDocument(cdoc: CharacterDocument) {
//    if (!cdoc) {
//        throw new Error('[Main::saveCharacterDocument] ERROR: Given null CharacterDocument to save.');
//    }
//    const cdata = cdoc.data;
//    if (!cdata) {
//        throw new Error('[Main::saveCharacterDocument] ERROR: Given CharacterDocument contains no CharData to save.');
//    }
//
//    let file = DriveApp.getFileById(cdoc.fileId);
//    file.setContent(JSON.stringify(cdata, undefined, 2));
//    Logger.log('Saved updated player data to %s', file.getName());
//}
//
//function includeCharacterScript() {
//    return `<script>${Main.getCharacterScript()}</script>`;
//}
//
//function includeCharManagerScript() {
//    return `<script>${Main.getCharManagerScript()}</script>`;
//}
//
///**
// * This class contains static helper methods for server-side routines.
// * They are NOT meant to be called directly from the client (i.e. with google.script.run).
// */
//class Main {
//    private static _char_manager_script: string;
//    static getCharManagerScript() {
//        if (!Main._char_manager_script) {
//            Main._char_manager_script = HtmlService.createTemplateFromFile('CharManager').getRawContent();
//        }
//        return Main._char_manager_script;
//    }
//
//    private static _character_script: string;
//    static getCharacterScript() {
//        if (!Main._character_script) {
//            Main._character_script = HtmlService.createTemplateFromFile('Character').getRawContent();
//        }
//        return Main._character_script;
//    }
//
//    private static _wetfefolder: GoogleAppsScript.Drive.Folder;
//    static getWetfeFolder() {
//        if (Main._wetfefolder) {
//            Logger.log('[Main::getWetfeFolder] Returning known _wetfefolder at %s', Main._wetfefolder);
//            return Main._wetfefolder;
//        }
//        Logger.log('[Main::getWetfeFolder] Locating _wetfefolder_ ...');
//        const wetfe_filename = 'WETFE';
//        const root_folder_id = DriveApp.getRootFolder().getId();
//        let wetfe_folder_iter = DriveApp.getFoldersByName(wetfe_filename);
//        while (wetfe_folder_iter.hasNext()) {
//            let candidate_wetfe_folder = wetfe_folder_iter.next();
//            let parents_itr = candidate_wetfe_folder.getParents();
//            while (parents_itr.hasNext()) {
//                let parent_id = parents_itr.next().getId();
//                if (parent_id === root_folder_id) {
//                    Main._wetfefolder = candidate_wetfe_folder;
//                    return candidate_wetfe_folder;
//                }
//            }
//        }
//        // Create WETFE foler in user's Drive root folder
//        Main._wetfefolder = DriveApp.createFolder(wetfe_filename);
//        return Main._wetfefolder;
//    }
//
//    private static _charfolder: GoogleAppsScript.Drive.Folder;
//    static getCharFolder() {
//        if (Main._charfolder) {
//            Logger.log('[Main::getCharFolder] Returning known _charfolder at %s', Main._charfolder);
//            return Main._charfolder;
//        }
//        Logger.log('[Main::getCharFolder] Locating _charfolder_ ...');
//        let wetfe_folder = Main.getWetfeFolder();
//        const char_foldername = 'Characters';
//        if (wetfe_folder) {
//            let char_folder_iter = DriveApp.getFoldersByName(char_foldername);
//            while (char_folder_iter.hasNext()) {
//                let candidate_char_folder = char_folder_iter.next();
//                let parents_itr = candidate_char_folder.getParents();
//                while (parents_itr.hasNext()) {
//                    let parent_id = parents_itr.next().getId();
//                    if (parent_id === wetfe_folder.getId()) {
//                        Main._charfolder = candidate_char_folder;
//                        return candidate_char_folder
//                    }
//                }
//            }
//            Main._charfolder = wetfe_folder.createFolder(char_foldername);
//            return Main._charfolder;
//        }
//        return null;
//    }
//}
//
//// function dump() {
////   return DriveApp.getFileById('1S4H0mYJYEHzZqwFa6OORaybaZ9r6-WnD').getBlob().getDataAsString();
//// }