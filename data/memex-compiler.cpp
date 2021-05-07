#include <fstream>
#include <filesystem>
#include <string>

// for convenience
namespace stdfs = std::filesystem;

// for summary length
constexpr size_t maxSummaryLength { 280 };

// main program
int main () {

    // create or open output file
    std::ofstream out { "memex.mmx" };

    // iterate through all files
    stdfs::path current { stdfs::current_path() };
    stdfs::recursive_directory_iterator it { current };
    for (auto &dir : it) {
        
        // ignore if is directory
        if (dir.is_directory()) continue;

        // ignore if not text file
        std::string ext { dir.path().extension().generic_string() };
        if (ext != "" && ext != ".txt") continue;

        // get the first line
        std::ifstream file { dir.path() };
        std::string summary { };
        while (!file.eof()) {

            // get the line
            std::getline(file, summary);

            // check if line is valid
            if (summary.size() > 0) {
                
                // starting with alnum, probably valid
                if (std::isalnum(summary[0])) break;

                // starting with quotes, probably valid
                if (summary[0] == '\"') break;
            }
        }
        
        // if we broke max, try to shorten
        while (summary.size() > maxSummaryLength) {

            // try to remove the last sentence
            size_t last { summary.size() - 2 };
            size_t possible { summary.find_last_of(":?!.\n", last) };

            // we failed to shorten, break
            if (possible == std::string::npos) break;
            summary = summary.substr(0, possible + 1);
        }

        // otherwise print path (for now)
        out << summary << "\n" << 
            stdfs::relative(dir.path(), current).c_str() << "\n" << std::endl;
    }
}
