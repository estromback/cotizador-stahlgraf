import os
import re
import glob

def fix_files():
    js_files = glob.glob('*.js')
    for file in js_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Inject persistence
        content = re.sub(
            r'(db\s*=\s*firebase\.firestore\(\);)',
            r'\1\n        if (typeof initFirestorePersistence === "function") initFirestorePersistence(db);',
            content
        )

        # 2. Fix array merging in syncFromFirebase
        content = re.sub(
            r'(appData|globalAppData)\s*=\s*\{\s*\.\.\.\1\s*,\s*\.\.\.cloudData\s*\};',
            r'''if (typeof mergeAppData === 'function') {
                \1 = mergeAppData(\1, cloudData);
            } else {
                \1 = { ...\1, ...cloudData };
            }''',
            content
        )

        # 3. Remove saveData() from loadData() in app.js
        if file == 'app.js':
            # Remove saveData() only from loadData() function
            # The pattern is:
            #        if(!appData.clients) appData.clients = [];
            #        saveData();
            #    }
            content = re.sub(
                r'if\(!appData\.clients\)\s*appData\.clients\s*=\s*\[\];\s*saveData\(\);\s*\}',
                r'if(!appData.clients) appData.clients = [];\n    }',
                content
            )

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print("Done applying fixes to JS files.")

if __name__ == '__main__':
    fix_files()
