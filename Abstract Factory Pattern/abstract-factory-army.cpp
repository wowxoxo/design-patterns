#include <iostream>
#include <vector>
using std::cout;
using std::endl;
using std::vector;

class Infantryman
{
  public:
    virtual void info() = 0;
    virtual ~Infantryman() {};
};

class Archer
{
  public:
    virtual void info() = 0;
    virtual ~Archer() {};
};

class Horseman
{
  public:
    virtual void info() = 0;
    virtual ~Horseman() {};
};

class RomanInfantryMan: public Infantryman
{
  public:
    void info() {
      cout << "RomanInfantryMan" << endl;
    }
};

class RomanArcher: public Archer
{
  public:
    virtual void info() {
      cout << "RomanArcher" << endl;
    }
};

class RomanHorseMan: public Horseman
{
  public: 
    void info() {
      cout << "RomanHorseMan" << endl;
    }
};

class CarthaginianInfantryMan: public Infantryman
{
  public:
    void info() {
      cout << "CarthaginianInfantryMan" << endl;
    }
};

class CarthagininArcher: public Archer
{
  public:
    virtual void info() {
      cout << "CarthaginianArcher" << endl;
    }
};

class CarthaginianHorseMan: public Horseman
{
  public: 
    void info() {
      cout << "CarthaginianHorseMan" << endl;
    }
};

class ArmyFactory
{
  public:
    virtual Infantryman* createInfantryMan() = 0;
    virtual Archer* createArcher() = 0;
    virtual Horseman* createHorseMan() = 0;
    virtual ~ArmyFactory() {}
};

class RomanArmyFactory: public ArmyFactory
{
  public:
    Infantryman* createInfantryMan() {
      return new RomanInfantryMan;
    }
    Archer* createArcher() {
      return new RomanArcher;
    }
    Horseman* createHorseMan() {
      return new RomanHorseMan;
    }
};

class CarthaginianArmyFactory: public ArmyFactory
{
  public:
    Infantryman* createInfantryMan() {
      return new CarthaginianInfantryMan;
    }
    Archer* createArcher() {
      return new CarthagininArcher;
    }
    Horseman* createHorseMan() {
      return new CarthaginianHorseMan;
    }
};

// Класс, содержащий всех воинов той или иной армии
class Army 
{
  public:    
   ~Army() {
      int i;
      for(i=0; i<vi.size(); ++i)  delete vi[i]; 
      for(i=0; i<va.size(); ++i)  delete va[i]; 
      for(i=0; i<vh.size(); ++i)  delete vh[i]; 
    }
    void info() {   
      int i;
      for(i=0; i<vi.size(); ++i)  vi[i]->info(); 
      for(i=0; i<va.size(); ++i)  va[i]->info(); 
      for(i=0; i<vh.size(); ++i)  vh[i]->info(); 
    }   
    vector<Infantryman*> vi; 
    vector<Archer*> va; 
    vector<Horseman*> vh;     
};

class Game
{
  public:
    Army* createArmy(ArmyFactory& factory) {
      Army* p = new Army;
      p->vi.push_back( factory.createInfantryMan() );
      p->va.push_back( factory.createArcher());
      p->vh.push_back( factory.createHorseMan() );
      return p;
    }
};

int main()
{
  Game game;
  RomanArmyFactory ra_factory;
  CarthaginianArmyFactory ca_factory;

  Army * ra = game.createArmy( ra_factory );
  Army * ca = game.createArmy( ca_factory );
  cout << "Roman army:" << endl;
  ra->info();
  cout << "\nCarthaginian army:" << endl;
  ca->info();
}

// Roman army:
// RomanInfantryman
// RomanArcher
// RomanHorseman
  
// Carthaginian army:
// CarthaginianInfantryman
// CarthaginianArcher
// CarthaginianHorseman